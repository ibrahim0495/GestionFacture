package com.projet.si.repository;

import com.projet.si.domain.Reclamation;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Reclamation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
    @Query("select reclamation from Reclamation reclamation where reclamation.user.login = ?#{principal.username}")
    List<Reclamation> findByUserIsCurrentUser();
}
