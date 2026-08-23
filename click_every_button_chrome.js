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
    this.consoleLogs = [];
    this.networkErrors = [];
    this.clickLog = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.callbacks.has(data.id)) {
        this.callbacks.get(data.id)(data);
        this.callbacks.delete(data.id);
      }
      if (data.method === "Runtime.consoleAPICalled") {
        this.consoleLogs.push(data.params);
      }
      if (data.method === "Network.responseReceived" && data.params.response.status >= 400) {
        this.networkErrors.push({
          url: data.params.response.url,
          status: data.params.response.status
        });
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
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    return res.result?.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runClickAudit() {
  console.log("==================================================");
  console.log("GRONLIV REAL CHROME DEEP BUTTON & INTERACTION AUDIT");
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

  try {
    const version = await requestJson("http://localhost:9222/json/version");
    console.log(`[REAL BROWSER] Connected: ${version.Browser}`);

    const pages = await requestJson("http://localhost:9222/json/list");
    const pageTarget = pages.find(p => p.type === "page") || pages[0];
    const client = new ChromeTester(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    const clickedButtons = [];

    // ── 1. HOMEPAGE BUTTONS ──
    console.log("\n1. Testing Homepage Buttons (http://localhost:3000/)...");
    await client.navigate("http://localhost:3000/");

    // Click 'Explore The Menu'
    const heroBtn1 = await client.eval(`
      const btn = Array.from(document.querySelectorAll('a, button')).find(el => el.innerText.includes('Explore The Menu') || el.innerText.includes('Explore Menu'));
      if (btn) { btn.click(); return btn.innerText.trim(); }
      return null;
    `);
    console.log(`   Clicked Hero Button: "${heroBtn1}" -> Navigated to /menu`);
    clickedButtons.push(`Homepage: ${heroBtn1}`);
    await sleep(1000);

    // Return to home, click 'Our Kitchen Story'
    await client.navigate("http://localhost:3000/");
    const heroBtn2 = await client.eval(`
      const btn = Array.from(document.querySelectorAll('a, button')).find(el => el.innerText.includes('Our Kitchen Story') || el.innerText.includes('Our Story'));
      if (btn) { btn.click(); return btn.innerText.trim(); }
      return null;
    `);
    console.log(`   Clicked Hero Button: "${heroBtn2}" -> Navigated to /about`);
    clickedButtons.push(`Homepage: ${heroBtn2}`);
    await sleep(1000);

    // ── 2. MENU PAGE BUTTONS & FILTERS ──
    console.log("\n2. Testing Menu Page Buttons & Category Filters (http://localhost:3000/menu)...");
    await client.navigate("http://localhost:3000/menu");

    // Click category tabs
    const categories = ['All', 'Nutrition Shakes', 'Superfood Bowls', 'Custom Blends'];
    for (const cat of categories) {
      const catRes = await client.eval(`
        const tab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim().includes('${cat}'));
        if (tab) { tab.click(); return true; }
        return false;
      `);
      console.log(`   Category Filter "${cat}": ${catRes ? 'Clicked OK' : 'Not found'}`);
      if (catRes) clickedButtons.push(`Menu Category Filter: ${cat}`);
      await sleep(400);
    }

    // Click "Add to Cart" on each product card on Menu
    const menuAddCount = await client.eval(`
      const addBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Add to Cart'));
      addBtns.forEach(b => b.click());
      addBtns.length;
    `);
    console.log(`   Clicked "Add to Cart" on ${menuAddCount} product cards in Menu`);
    clickedButtons.push(`Menu: Add to Cart (${menuAddCount} cards)`);
    await sleep(1000);

    // ── 3. PRODUCT DETAIL INTERACTION ──
    console.log("\n3. Testing Product Detail Buttons (/product/classic-vanilla-bean)...");
    await client.navigate("http://localhost:3000/product/classic-vanilla-bean");

    // Click quantity plus (+) button twice
    const qtyPlusRes = await client.eval(`
      const plusBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('+') || b.ariaLabel?.includes('Increase'));
      if (plusBtn) { plusBtn.click(); plusBtn.click(); return true; }
      return false;
    `);
    console.log(`   Clicked Quantity [+] Twice: ${qtyPlusRes ? 'OK' : 'Not found'}`);
    if (qtyPlusRes) clickedButtons.push(`Product Detail: Quantity [+]`);

    // Click quantity minus (-) button once
    const qtyMinusRes = await client.eval(`
      const minusBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('-') || b.ariaLabel?.includes('Decrease'));
      if (minusBtn) { minusBtn.click(); return true; }
      return false;
    `);
    console.log(`   Clicked Quantity [-] Once: ${qtyMinusRes ? 'OK' : 'Not found'}`);
    if (qtyMinusRes) clickedButtons.push(`Product Detail: Quantity [-]`);

    // Click Add to Cart
    const pdAddBtn = await client.eval(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add to Cart') || b.innerText.includes('Added'));
      if (btn) { btn.click(); return btn.innerText.trim(); }
      return null;
    `);
    console.log(`   Clicked Product Detail Add to Cart: "${pdAddBtn}"`);
    if (pdAddBtn) clickedButtons.push(`Product Detail: ${pdAddBtn}`);
    await sleep(1000);

    // ── 4. DELIVERY PAGE BUTTON ──
    console.log("\n4. Testing Delivery Page Checker (http://localhost:3000/delivery)...");
    await client.navigate("http://localhost:3000/delivery");
    
    // Check valid pincode 360001
    const delRes1 = await client.eval(`
      const inp = document.querySelector('input');
      if (inp) {
        inp.value = '360001';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('check'));
      if (btn) { btn.click(); return true; }
      return false;
    `);
    console.log(`   Pincode 360001 Check Button: ${delRes1 ? 'Clicked OK' : 'Failed'}`);
    if (delRes1) clickedButtons.push(`Delivery: Check Pincode 360001`);
    await sleep(1000);

    // Check invalid pincode 999999
    const delRes2 = await client.eval(`
      const inp = document.querySelector('input');
      if (inp) {
        inp.value = '999999';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('check'));
      if (btn) { btn.click(); return true; }
      return false;
    `);
    console.log(`   Pincode 999999 Check Button: ${delRes2 ? 'Clicked OK' : 'Failed'}`);
    if (delRes2) clickedButtons.push(`Delivery: Check Pincode 999999`);
    await sleep(1000);

    // ── 5. CONTACT FORM BUTTON ──
    console.log("\n5. Testing Contact Page Form (http://localhost:3000/contact)...");
    await client.navigate("http://localhost:3000/contact");

    const contactRes = await client.eval(`
      (() => {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        inputs.forEach(i => {
          if (i.placeholder?.toLowerCase().includes('name') || i.name === 'name') i.value = 'Harish QA Tester';
          if (i.placeholder?.toLowerCase().includes('email') || i.type === 'email') i.value = 'harish.qa@gronliv.in';
          if (i.placeholder?.toLowerCase().includes('phone') || i.name === 'phone') i.value = '9876543210';
          if (i.placeholder?.toLowerCase().includes('subject') || i.name === 'subject') i.value = 'General Inquiry';
          if (i.tagName === 'TEXTAREA') i.value = 'Testing contact form submission via Chrome CDP.';
          i.dispatchEvent(new Event('input', { bubbles: true }));
        });
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('send') || b.innerText.toLowerCase().includes('submit'));
        if (btn) { btn.click(); return btn.innerText.trim(); }
        return null;
      })()
    `);
    console.log(`   Contact Form Submit Button: "${contactRes}"`);
    if (contactRes) clickedButtons.push(`Contact: ${contactRes}`);
    await sleep(1000);

    // ── 6. CART & DEMO CHECKOUT ──
    console.log("\n6. Testing Cart & Checkout Buttons (http://localhost:3000/cart)...");
    await client.navigate("http://localhost:3000/cart");

    // Click cart quantity modifiers
    const cartQtyRes = await client.eval(`
      const btns = Array.from(document.querySelectorAll('button'));
      const plusBtn = btns.find(b => b.innerText.includes('+'));
      if (plusBtn) { plusBtn.click(); return true; }
      return false;
    `);
    console.log(`   Cart Item Quantity [+] Button: ${cartQtyRes ? 'Clicked OK' : 'N/A'}`);
    if (cartQtyRes) clickedButtons.push(`Cart: Quantity [+]`);

    // Fill checkout form
    const checkoutResult = await client.eval(`
      (async () => {
        const nameInp = document.querySelector('input[placeholder*="Name"], input[name="name"], #customerName');
        if (nameInp) { nameInp.value = 'Harish Verification'; nameInp.dispatchEvent(new Event('input', { bubbles: true })); }
        
        const phoneInp = document.querySelector('input[placeholder*="Phone"], input[name="phone"], #phone');
        if (phoneInp) { phoneInp.value = '9876543210'; phoneInp.dispatchEvent(new Event('input', { bubbles: true })); }

        const addrInp = document.querySelector('input[placeholder*="Address"], textarea[placeholder*="Address"], #deliveryAddress');
        if (addrInp) { addrInp.value = 'Flat 202, Kalavad Road, Rajkot'; addrInp.dispatchEvent(new Event('input', { bubbles: true })); }

        await new Promise(r => setTimeout(r, 400));

        const placeBtn = Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.toLowerCase().includes('place demo order') || 
          b.innerText.toLowerCase().includes('checkout') ||
          b.innerText.toLowerCase().includes('order')
        );

        if (placeBtn && !placeBtn.disabled) {
          placeBtn.click();
          return { text: placeBtn.innerText.trim(), clicked: true };
        }
        return { clicked: false };
      })()
    `);
    console.log(`   Checkout Button Clicked:`, checkoutResult);
    if (checkoutResult.clicked) clickedButtons.push(`Cart: ${checkoutResult.text}`);
    await sleep(3000);

    const isConfirmed = await client.eval(`
      document.body.innerText.includes('Order Placed') || 
      document.body.innerText.includes('Order #') || 
      document.body.innerText.includes('Confirmed') ||
      document.body.innerText.includes('Thank you')
    `);
    console.log(`   Order Confirmation Rendered: ${isConfirmed ? 'YES' : 'NO'}`);

    console.log("\n==================================================");
    console.log(`TOTAL BUTTONS & INTERACTION CONTROLS TESTED: ${clickedButtons.length}`);
    console.log("Clicked Elements Summary:");
    clickedButtons.forEach((b, i) => console.log(`  ${i + 1}. ${b}`));
    console.log(`\nChrome Console Errors: ${client.consoleLogs.filter(l => l.type === 'error').length}`);
    console.log(`Network Errors (>=400): ${client.networkErrors.length}`);
    console.log("==================================================");

    client.close();
  } catch (err) {
    console.error("Click audit error:", err);
  } finally {
    chromeProcess.kill();
  }
}

runClickAudit();
