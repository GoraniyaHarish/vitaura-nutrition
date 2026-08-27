package com.vitaura.domain;
import jakarta.persistence.*;

@Entity
@Table(name="pincodes")
public class Pincode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 6, unique = true)
    private String code;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="zone_id")
    private DeliveryZone zone;
    
    private boolean active;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public DeliveryZone getZone() { return zone; }
    public void setZone(DeliveryZone zone) { this.zone = zone; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}

