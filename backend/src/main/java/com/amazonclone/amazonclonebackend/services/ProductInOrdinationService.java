package com.amazonclone.amazonclonebackend.services;

import com.amazonclone.amazonclonebackend.entities.ProductInOrdination;
import com.amazonclone.amazonclonebackend.exception.OrderNotFoundException;
import com.amazonclone.amazonclonebackend.repositories.ProductInOrdinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductInOrdinationService {

    @Autowired
    private ProductInOrdinationRepository productInOrdinationRepository;


    public List<ProductInOrdination> findAllProductInOrdination(){
        return productInOrdinationRepository.findAll();
    }

    public ProductInOrdination addProductInOrdination(ProductInOrdination productInOrdination){
        return productInOrdinationRepository.saveAndFlush(productInOrdination);
    }

    public ProductInOrdination updateProductInOrdination(ProductInOrdination productInOrdination){
        return productInOrdinationRepository.save(productInOrdination);
    }

    public void deleteProductInOrdinationById(Long id){
        productInOrdinationRepository.deleteById(id);
    }
}
