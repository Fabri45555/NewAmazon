package com.amazonclone.amazonclonebackend.repositories;

import com.amazonclone.amazonclonebackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Long> {

    void deleteProductById(Long id);

    Optional<Product> findProductById(Long id);
}
