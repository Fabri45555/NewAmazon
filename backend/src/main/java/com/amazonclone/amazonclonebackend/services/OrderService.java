package com.amazonclone.amazonclonebackend.services;

import com.amazonclone.amazonclonebackend.entities.Ordination;
import com.amazonclone.amazonclonebackend.entities.Product;
import com.amazonclone.amazonclonebackend.entities.ProductInOrdination;
import com.amazonclone.amazonclonebackend.exception.DateWrongRangeException;
import com.amazonclone.amazonclonebackend.exception.OrderNotFoundException;
import com.amazonclone.amazonclonebackend.exception.QuantityProductUnavailableException;
import com.amazonclone.amazonclonebackend.repositories.OrderRepository;
import com.amazonclone.amazonclonebackend.repositories.ProductInOrdinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private  OrderRepository orderRepository;

    @Autowired
    private  ProductInOrdinationRepository productInOrdinationRepository;

    @PersistenceContext
    private  EntityManager entityManager;



    @Transactional(readOnly = false)
    public Ordination addOrder(Ordination ordination) {
        Ordination result = orderRepository.save(ordination);
        return result;
    }


    public List<Ordination> findAllOrder(){
        return  orderRepository.findAll();
    }//findAll

    public Ordination updateOrder(Ordination order){
        return  orderRepository.save(order);
    }//updateOrder

    public Ordination findOrderById(Long id){
        return orderRepository.findOrderById(id).orElseThrow(() -> new OrderNotFoundException("L'ordine con id "+id+" non è stato trovato"));
    }//findOrderById

    @Transactional
    public List<Ordination> getOrdinationInPeriod( Date startDate, Date endDate) throws DateWrongRangeException {
        if ( startDate.compareTo(endDate) >= 0 ) {
            throw new DateWrongRangeException();
        }
        return orderRepository.findInPeriod(startDate, endDate);
    }

    public void deleteOrderById(Long id){
        List<Ordination> x = findAllOrder();
        for(int i=0;i<x.size();i++){
            if(x.get(i).getId().equals(id)) {
                List<ProductInOrdination> p = x.get(i).getProductsInOrdination();
                for(int j=0;j<p.size();j++){
                    productInOrdinationRepository.deleteById(p.get(j).getId());
                }
            }
        }
        orderRepository.deleteById(id);
    }//deleteOrderById

}//OrderService
