package in.gronliv.dto;
public class DeliveryCheckResponse {
    private boolean available;
    private String zoneName;
    private Long deliveryFee;
    private int estimatedMinutes;
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getZoneName() { return zoneName; }
    public void setZoneName(String zoneName) { this.zoneName = zoneName; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
}
