package com.amazonclone.amazonclonebackend.repositories;

import com.amazonclone.amazonclonebackend.entities.Ordination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Ordination,Long> {

    void deleteOrderById(Long id);

    Optional<Ordination> findOrderById(Long id);


    @Query("select p from Ordination p where p.ordinationTime > ?1 and p.ordinationTime < ?2")
    List<Ordination> findInPeriod(Date startDate, Date endDate);

}
