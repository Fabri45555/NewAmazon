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
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private  OrderRepository orderRepository;

    @Autowired
    private ProductInOrdinationRepository productInOrdinationRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Ordination addOrder(Ordination ordination) throws QuantityProductUnavailableException {
        Ordination result = orderRepository.save(ordination);
        for ( ProductInOrdination pio : result.getProductsInOrdination() ) {
            pio.setOrdination(result);
            ProductInOrdination justAdded = productInOrdinationRepository.save(pio);
            entityManager.refresh(justAdded);
            Product product = justAdded.getProduct();
            int newQuantity = product.getQuantity() - pio.getQuantity();
            if ( newQuantity < 0 ) {
                throw new QuantityProductUnavailableException();
            }
            product.setQuantity(newQuantity);
            entityManager.refresh(pio);
        }
        entityManager.refresh(result);
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

    public void deleteOrderById(Long id)
    {
        orderRepository.deleteById(id);
    }//deleteOrderById

}//OrderService
