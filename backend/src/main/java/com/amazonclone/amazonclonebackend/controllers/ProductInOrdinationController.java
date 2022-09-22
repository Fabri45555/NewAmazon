package com.amazonclone.amazonclonebackend.controllers;

import com.amazonclone.amazonclonebackend.entities.Product;
import com.amazonclone.amazonclonebackend.entities.ProductInOrdination;
import com.amazonclone.amazonclonebackend.repositories.ProductInOrdinationRepository;
import com.amazonclone.amazonclonebackend.services.ProductInOrdinationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product_in_ordination")
public class ProductInOrdinationController {

    private final ProductInOrdinationService productInOrdinationService;

    public ProductInOrdinationController(ProductInOrdinationService productInOrdinationService){
        this.productInOrdinationService=productInOrdinationService;
    }


    @GetMapping("all")
    public ResponseEntity<List<ProductInOrdination>> getAllProductInOrdination()
    {
        List<ProductInOrdination> l = productInOrdinationService.findAllProductInOrdination();
        return new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ProductInOrdination> addProductInOrdination(@RequestBody ProductInOrdination p){
        ProductInOrdination newP = productInOrdinationService.addProductInOrdination(p);
        return new ResponseEntity<>(newP,HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<ProductInOrdination> updateProductInOrdination(@RequestBody ProductInOrdination p){
        ProductInOrdination upP = productInOrdinationService.addProductInOrdination(p);
        return new ResponseEntity<>(upP,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> updateProductInOrdination(@PathVariable Long id){
        productInOrdinationService.deleteProductInOrdinationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
