package com.vitaura.controller;

import com.vitaura.dto.CreateOrderRequest;
import com.vitaura.dto.OrderResponse;
import com.vitaura.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) { this.orderService = orderService; }
    
    @PostMapping
    public OrderResponse createOrder(@Valid @RequestBody CreateOrderRequest req, HttpServletRequest request) {
        return orderService.createOrder(req, request.getRemoteAddr());
    }
    
    @GetMapping("/{orderId}")
    public OrderResponse getOrder(@PathVariable String orderId) {
        return orderService.getOrderStatus(orderId);
    }
}

