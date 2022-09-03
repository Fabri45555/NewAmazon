package com.amazonclone.amazonclonebackend.services;

import com.amazonclone.amazonclonebackend.entities.Product;
import com.amazonclone.amazonclonebackend.exception.ProductNotFoundException;
import com.amazonclone.amazonclonebackend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.lang.*;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product){
        product.setBarcode(UUID.randomUUID().toString());
        return productRepository.save(product);
    }

    public List<Product> findAllProduct(){
        return productRepository.findAll();
    }

    public Product updateProduct(Product product){
        return productRepository.save(product);
    }

    public Product findProductById(Long id){
        return productRepository.findProductById(id).orElseThrow(() ->new ProductNotFoundException("Il prodotto con id " + id + "non è stato trovato"));
    }

    public void deleteProductById(Long id){
        productRepository.deleteById(id);
    }
}
