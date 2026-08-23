package in.gronliv.dto;

public class NutritionInfoDTO {
    private String servingSize;
    private int calories;
    private int protein; // grams * 10 or standard grams
    private int carbohydrates;
    private int fat;
    private int fiber;
    private int sugar;

    public NutritionInfoDTO() {}

    public NutritionInfoDTO(String servingSize, int calories, int protein, int carbohydrates, int fat, int fiber, int sugar) {
        this.servingSize = servingSize;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.fiber = fiber;
        this.sugar = sugar;
    }

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
