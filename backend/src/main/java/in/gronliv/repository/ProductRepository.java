package in.gronliv.repository;
import in.gronliv.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategorySlugAndAvailableTrue(String categorySlug, Pageable pageable);
    Page<Product> findByAvailableTrue(Pageable pageable);
    List<Product> findByFeaturedTrueAndAvailableTrueOrderBySortOrderAsc();
    Optional<Product> findBySlugAndAvailableTrue(String slug);
}
