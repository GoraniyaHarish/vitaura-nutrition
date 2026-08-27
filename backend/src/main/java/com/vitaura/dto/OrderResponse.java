package com.vitaura.dto;
public class OrderResponse {
    private String orderId;
    private String orderNumber;
    private String status;
    private Long subtotal;
    private Long deliveryFee;
    private Long total;

    private String paymentStatus;
    private String paymentMethod;
    private boolean isDemo;
    private String paymentMessage;

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public boolean isDemo() { return isDemo; }
    public void setDemo(boolean demo) { isDemo = demo; }
    public String getPaymentMessage() { return paymentMessage; }
    public void setPaymentMessage(String paymentMessage) { this.paymentMessage = paymentMessage; }
    public Long getSubtotal() { return subtotal; }
    public void setSubtotal(Long subtotal) { this.subtotal = subtotal; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
}

