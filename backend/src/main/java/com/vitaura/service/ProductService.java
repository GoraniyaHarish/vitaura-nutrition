package com.vitaura.service;

import com.vitaura.domain.NutritionInfo;
import com.vitaura.domain.Product;
import com.vitaura.dto.NutritionInfoDTO;
import com.vitaura.dto.ProductDTO;
import com.vitaura.dto.ProductListDTO;
import com.vitaura.exception.ResourceNotFoundException;
import com.vitaura.repository.NutritionInfoRepository;
import com.vitaura.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final NutritionInfoRepository nutritionInfoRepository;

    public ProductService(ProductRepository productRepository, NutritionInfoRepository nutritionInfoRepository) {
        this.productRepository = productRepository;
        this.nutritionInfoRepository = nutritionInfoRepository;
    }

    public ProductListDTO getProducts(String category, int page, int size) {
        Page<Product> productPage;
        if (category != null && !category.isEmpty()) {
            productPage = productRepository.findByCategorySlugAndAvailableTrue(category, PageRequest.of(page, size));
        } else {
            productPage = productRepository.findByAvailableTrue(PageRequest.of(page, size));
        }

        ProductListDTO dto = new ProductListDTO();
        dto.setProducts(productPage.getContent().stream().map(this::mapToDTO).collect(Collectors.toList()));
        dto.setCurrentPage(productPage.getNumber());
        dto.setTotalPages(productPage.getTotalPages());
        dto.setTotalElements(productPage.getTotalElements());
        return dto;
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndAvailableTrueOrderBySortOrderAsc()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ProductDTO getProduct(String slug) {
        return productRepository.findBySlugAndAvailableTrue(slug)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private ProductDTO mapToDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setSlug(p.getSlug());
        dto.setName(p.getName());
        dto.setShortDescription(p.getShortDescription());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setImageUrl(p.getImageUrl());
        if (p.getCategory() != null) {
            dto.setCategoryName(p.getCategory().getName());
            dto.setCategorySlug(p.getCategory().getSlug());
        }
        dto.setTags(p.getTags());
        dto.setAvailable(p.isAvailable());
        dto.setFeatured(p.isFeatured());

        nutritionInfoRepository.findByProductId(p.getId()).ifPresent(n -> {
            dto.setNutritionInfo(new NutritionInfoDTO(
                n.getServingSize(),
                n.getCalories(),
                n.getProtein(),
                n.getCarbohydrates(),
                n.getFat(),
                n.getFiber(),
                n.getSugar()
            ));
        });

        return dto;
    }
}

