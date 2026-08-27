package com.vitaura.domain;
import jakarta.persistence.*;

@Entity
@Table(name="nutrition_info")
public class NutritionInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;
    
    private String servingSize;
    private int calories;
    private int protein; // grams * 10
    private int carbohydrates;
    private int fat;
    private int fiber;
    private int sugar;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getServingSize() { return servingSize; }
    public void setServingSize(String servingSize) { this.servingSize = servingSize; }
    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }
    public int getProtein() { return protein; }
    public void setProtein(int protein) { this.protein = protein; }
    public int getCarbohydrates() { return carbohydrates; }
    public void setCarbohydrates(int carbohydrates) { this.carbohydrates = carbohydrates; }
    public int getFat() { return fat; }
    public void setFat(int fat) { this.fat = fat; }
    public int getFiber() { return fiber; }
    public void setFiber(int fiber) { this.fiber = fiber; }
    public int getSugar() { return sugar; }
    public void setSugar(int sugar) { this.sugar = sugar; }
}

