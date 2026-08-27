package com.vitaura.service;

import com.vitaura.domain.Order;
import com.vitaura.domain.OrderStatus;
import com.vitaura.domain.PaymentStatus;
import com.vitaura.dto.PaymentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    @Value("${vitaura.payment.provider:demo}")
    private String paymentProvider;

    public PaymentResponse processPayment(Order order, String paymentMethod) {
        if ("razorpay".equalsIgnoreCase(paymentProvider)) {
            throw new UnsupportedOperationException("Razorpay payment provider is currently a boundary stub. Configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable live gateway processing.");
        }

        // Default Demo Mode Payment Processing
        String demoRef = "DEMO-TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setPaymentStatus(PaymentStatus.DEMO_PAID);
        order.setStatus(OrderStatus.CONFIRMED);
        order.setPaymentMethod("DEMO");

        PaymentResponse response = new PaymentResponse();
        response.setPaymentProvider("DEMO");
        response.setPaymentReference(demoRef);
        response.setStatus("DEMO_PAID");
        response.setDemo(true);
        response.setMessage("Demo Mode — No real payment was processed. Order automatically confirmed for testing.");
        return response;
    }

    public PaymentResponse verifyPayment(String paymentReference, String signature) {
        PaymentResponse response = new PaymentResponse();
        response.setPaymentProvider("DEMO");
        response.setPaymentReference(paymentReference);
        response.setStatus("DEMO_PAID");
        response.setDemo(true);
        response.setMessage("Demo payment verification successful.");
        return response;
    }

    public PaymentResponse getPaymentStatus(String paymentReference) {
        PaymentResponse response = new PaymentResponse();
        response.setPaymentProvider("DEMO");
        response.setPaymentReference(paymentReference);
        response.setStatus("DEMO_PAID");
        response.setDemo(true);
        response.setMessage("Demo Payment Status: DEMO_PAID");
        return response;
    }
}

