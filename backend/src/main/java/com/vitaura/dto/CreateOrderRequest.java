package com.vitaura.dto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
public class CreateOrderRequest {
    @NotBlank
    private String customerName;
    @NotBlank
    private String customerPhone;
    @Email
    private String customerEmail;
    @NotBlank
    private String deliveryAddress;
    @NotBlank
    @Pattern(regexp="\\d{6}")
    private String pincode;
    private String notes;
    private String paymentMethod;
    
    @NotEmpty
    @Valid
    private List<OrderItemRequest> items;

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getPaymentMethod() { return paymentMethod != null && !paymentMethod.trim().isEmpty() ? paymentMethod : "COD"; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public static class OrderItemRequest {
        @NotNull
        private Long productId;
        @Min(1)
        @Max(50)
        private int quantity;
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}

