package com.vitaura.controller;

import com.vitaura.dto.ProductDTO;
import com.vitaura.dto.ProductListDTO;
import com.vitaura.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) { this.productService = productService; }
    
    @GetMapping
    public ProductListDTO getProducts(@RequestParam(required=false) String category,
                                      @RequestParam(defaultValue="0") int page,
                                      @RequestParam(defaultValue="10") int size) {
        return productService.getProducts(category, page, size);
    }
    
    @GetMapping("/featured")
    public List<ProductDTO> getFeatured() {
        return productService.getFeaturedProducts();
    }
    
    @GetMapping("/{slug}")
    public ProductDTO getProduct(@PathVariable String slug) {
        return productService.getProduct(slug);
    }
}

