package in.gronliv.dto;
import java.util.List;
public class ProductDTO {
    private Long id;
    private String slug;
    private String name;
    private String shortDescription;
    private String description;
    private Long price;
    private String imageUrl;
    private String categoryName;
    private String categorySlug;
    private List<String> tags;
    private boolean available;
    private boolean featured;
    private NutritionInfoDTO nutritionInfo;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public NutritionInfoDTO getNutritionInfo() { return nutritionInfo; }
    public void setNutritionInfo(NutritionInfoDTO nutritionInfo) { this.nutritionInfo = nutritionInfo; }
}
