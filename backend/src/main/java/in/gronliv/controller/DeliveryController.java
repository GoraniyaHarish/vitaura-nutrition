package in.gronliv.controller;

import in.gronliv.dto.DeliveryCheckResponse;
import in.gronliv.service.DeliveryService;
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
