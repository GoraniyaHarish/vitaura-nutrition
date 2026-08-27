package com.vitaura.service;

import com.vitaura.domain.Pincode;
import com.vitaura.dto.DeliveryCheckResponse;
import com.vitaura.repository.PincodeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeliveryService {
    private final PincodeRepository pincodeRepository;

    public DeliveryService(PincodeRepository pincodeRepository) {
        this.pincodeRepository = pincodeRepository;
    }

    public DeliveryCheckResponse checkDelivery(String pincode) {
        Optional<Pincode> p = pincodeRepository.findByCodeAndActiveTrue(pincode);
        DeliveryCheckResponse res = new DeliveryCheckResponse();
        if (p.isPresent() && p.get().getZone().isActive()) {
            res.setAvailable(true);
            res.setZoneName(p.get().getZone().getName());
            res.setDeliveryFee(p.get().getZone().getDeliveryFee());
            res.setEstimatedMinutes(p.get().getZone().getEstimatedMinutes());
        } else {
            res.setAvailable(false);
        }
        return res;
    }
}

