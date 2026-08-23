package in.gronliv.dto;

public class PaymentResponse {
    private String paymentProvider;
    private String paymentReference;
    private String status;
    private boolean isDemo;
    private String message;

    public String getPaymentProvider() { return paymentProvider; }
    public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }
    public String getPaymentReference() { return paymentReference; }
    public void setPaymentReference(String paymentReference) { this.paymentReference = paymentReference; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isDemo() { return isDemo; }
    public void setDemo(boolean demo) { isDemo = demo; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
