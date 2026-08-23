const { spawn } = require("child_process");
const http = require("http");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || "GET"
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

class ChromeTester {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.callbacks = new Map();
    this.networkRequests = [];
    this.consoleLogs = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.callbacks.has(data.id)) {
        this.callbacks.get(data.id)(data);
        this.callbacks.delete(data.id);
      }
      if (data.method === "Network.responseReceived") {
        this.networkRequests.push({
          url: data.params.response.url,
          status: data.params.response.status,
          mimeType: data.params.response.mimeType
        });
      }
      if (data.method === "Runtime.consoleAPICalled") {
        this.consoleLogs.push(data.params);
      }
    };
    await new Promise((res) => this.ws.onopen = res);
    await this.send("Page.enable");
    await this.send("Runtime.enable");
    await this.send("DOM.enable");
    await this.send("Network.enable");
  }

  send(method, params = {}) {
    return new Promise((resolve) => {
      const id = this.msgId++;
      this.callbacks.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async navigate(url) {
    await this.send("Page.navigate", { url });
    await sleep(1500);
    // Smooth scroll through entire page to trigger lazy loaded images
    await this.eval(`
      new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    `);
    await sleep(2000);
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    return res.result?.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runVisualImageAudit() {
  console.log("==================================================");
  console.log("GRONLIV REAL CHROME VISUAL & IMAGE AUDIT");
  console.log("==================================================");

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const profileDir = "d:\\GROLIV\\chrome_qa_profile";
  
  const chromeProcess = spawn(chromePath, [
    "--remote-debugging-port=9222",
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profileDir}`
  ]);

  await sleep(3000);

  const routes = [
    "/",
    "/menu",
    "/product/classic-vanilla-bean",
    "/product/double-dark-cacao",
    "/about",
    "/delivery",
    "/contact",
    "/cart"
  ];

  try {
    const version = await requestJson("http://localhost:9222/json/version");
    console.log(`[REAL BROWSER] Connected to: ${version.Browser}`);

    const pages = await requestJson("http://localhost:9222/json/list");
    const pageTarget = pages.find(p => p.type === "page") || pages[0];
    const client = new ChromeTester(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    let allBroken = 0;

    for (const r of routes) {
      console.log(`\nInspecting page: http://localhost:3000${r}`);
      await client.navigate(`http://localhost:3000${r}`);

      // Count rendered images
      const imgStats = await client.eval(`
        const imgs = Array.from(document.querySelectorAll('img'));
        const naturalSuccess = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
        const brokenImgs = imgs.filter(i => !i.complete || i.naturalWidth === 0).length;
        ({
          totalImages: imgs.length,
          naturalSuccess,
          brokenImgs,
          srcs: imgs.map(i => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0 }))
        })
      `);

      console.log(`  - Total Images on DOM: ${imgStats.totalImages}`);
      console.log(`  - Successfully Rendered (naturalWidth > 0): ${imgStats.naturalSuccess}`);
      console.log(`  - Broken Images (naturalWidth === 0): ${imgStats.brokenImgs}`);
      if (imgStats.brokenImgs > 0) {
        console.error(`  [!] BROKEN IMAGES DETECTED ON ${r}:`, imgStats.srcs.filter(s => !s.ok));
        allBroken += imgStats.brokenImgs;
      }
    }

    // Check all image network responses
    const imageResponses = client.networkRequests.filter(req => 
      req.url.includes("/images/") || req.url.includes("_next/image")
    );
    const failedImages = imageResponses.filter(req => req.status >= 400);

    console.log(`\n==================================================`);
    console.log(`Total Image HTTP Requests Captured in Chrome: ${imageResponses.length}`);
    console.log(`Failed Image HTTP Requests (>= 400): ${failedImages.length}`);
    console.log(`Total Broken Images Across Entire App: ${allBroken}`);
    if (failedImages.length === 0 && allBroken === 0) {
      console.log("🏆 PERFECT RESULT: 100% OF IMAGES RENDERED WITH NATURAL DIMENSIONS & HTTP 200 IN REAL CHROME!");
    }
    console.log(`==================================================`);

    client.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    chromeProcess.kill();
  }
}

runVisualImageAudit();
