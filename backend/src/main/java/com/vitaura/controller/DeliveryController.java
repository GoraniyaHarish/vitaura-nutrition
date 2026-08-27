package com.vitaura.controller;

import com.vitaura.dto.DeliveryCheckResponse;
import com.vitaura.service.DeliveryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    private final DeliveryService deliveryService;
    public DeliveryController(DeliveryService deliveryService) { this.deliveryService = deliveryService; }
    
    @GetMapping("/check")
    public DeliveryCheckResponse checkDelivery(@RequestParam String pincode) {
        return deliveryService.checkDelivery(pincode);
    }
}

