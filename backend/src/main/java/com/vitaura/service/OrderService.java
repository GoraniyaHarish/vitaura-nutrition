package com.vitaura.service;

import com.vitaura.domain.*;
import com.vitaura.dto.CreateOrderRequest;
import com.vitaura.dto.OrderResponse;
import com.vitaura.dto.PaymentResponse;
import com.vitaura.exception.ResourceNotFoundException;
import com.vitaura.repository.OrderRepository;
import com.vitaura.repository.PincodeRepository;
import com.vitaura.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final PincodeRepository pincodeRepository;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, PincodeRepository pincodeRepository, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.pincodeRepository = pincodeRepository;
        this.paymentService = paymentService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest req, String clientIp) {
        Pincode pin = pincodeRepository.findByCodeAndActiveTrue(req.getPincode())
                .orElseThrow(() -> new IllegalArgumentException("Delivery not available to this pincode"));

        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomerName(req.getCustomerName());
        order.setCustomerEmail(req.getCustomerEmail());
        order.setCustomerPhone(req.getCustomerPhone());
        order.setDeliveryAddress(req.getDeliveryAddress());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setNotes(req.getNotes());
        
        long subtotal = 0;
        for (CreateOrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Product p = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(p);
            item.setProductName(p.getName());
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(p.getPrice());
            item.setTotalPrice(p.getPrice() * itemReq.getQuantity());
            order.getItems().add(item);
            subtotal += item.getTotalPrice();
        }
        
        order.setSubtotal(subtotal);
        order.setDeliveryFee(pin.getZone().getDeliveryFee());
        order.setDiscount(0L);
        order.setTotal(subtotal + order.getDeliveryFee());
        
        // Process payment directly using PaymentService
        PaymentResponse paymentResponse = paymentService.processPayment(order, req.getPaymentMethod());

        orderRepository.save(order);
        
        OrderResponse res = new OrderResponse();
        res.setOrderId(order.getOrderNumber());
        res.setOrderNumber(order.getOrderNumber());
        res.setStatus(order.getStatus().name());
        res.setPaymentStatus(order.getPaymentStatus().name());
        res.setPaymentMethod(order.getPaymentMethod());
        res.setDemo(paymentResponse.isDemo());
        res.setPaymentMessage(paymentResponse.getMessage());
        res.setSubtotal(order.getSubtotal());
        res.setDeliveryFee(order.getDeliveryFee());
        res.setTotal(order.getTotal());
        return res;
    }
    
    public OrderResponse getOrderStatus(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        OrderResponse res = new OrderResponse();
        res.setOrderId(order.getOrderNumber());
        res.setOrderNumber(order.getOrderNumber());
        res.setStatus(order.getStatus().name());
        res.setPaymentStatus(order.getPaymentStatus().name());
        res.setPaymentMethod(order.getPaymentMethod());
        res.setDemo("DEMO".equalsIgnoreCase(order.getPaymentMethod()));
        res.setPaymentMessage("DEMO".equalsIgnoreCase(order.getPaymentMethod()) ? "Demo Mode — Order saved in DB." : "Order status retrieved.");
        res.setSubtotal(order.getSubtotal());
        res.setDeliveryFee(order.getDeliveryFee());
        res.setTotal(order.getTotal());
        return res;
    }
}

