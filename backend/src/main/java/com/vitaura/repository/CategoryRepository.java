package com.vitaura.repository;
import com.vitaura.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findByActiveTrueOrderBySortOrderAsc();
}

