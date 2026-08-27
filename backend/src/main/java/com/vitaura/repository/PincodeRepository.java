package com.vitaura.repository;
import com.vitaura.domain.Pincode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface PincodeRepository extends JpaRepository<Pincode, Long> {
    Optional<Pincode> findByCodeAndActiveTrue(String code);
}

