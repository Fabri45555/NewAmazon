package com.amazonclone.amazonclonebackend.repositories;

import com.amazonclone.amazonclonebackend.entities.ProductInOrdination;
import org.apache.el.lang.ELArithmetic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductInOrdinationRepository extends JpaRepository<ProductInOrdination,Long> {

}
