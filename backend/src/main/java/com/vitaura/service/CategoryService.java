package com.vitaura.service;

import com.vitaura.dto.CategoryDTO;
import com.vitaura.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findByActiveTrueOrderBySortOrderAsc().stream().map(c -> {
            CategoryDTO dto = new CategoryDTO();
            dto.setSlug(c.getSlug());
            dto.setName(c.getName());
            dto.setDescription(c.getDescription());
            return dto;
        }).collect(Collectors.toList());
    }
}

