package in.gronliv.repository;

import in.gronliv.domain.NutritionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NutritionInfoRepository extends JpaRepository<NutritionInfo, Long> {
    Optional<NutritionInfo> findByProductId(Long productId);
}
