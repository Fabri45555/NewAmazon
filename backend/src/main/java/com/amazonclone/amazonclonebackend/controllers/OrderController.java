package com.amazonclone.amazonclonebackend.controllers;


import com.amazonclone.amazonclonebackend.entities.Ordination;
import com.amazonclone.amazonclonebackend.exception.DateWrongRangeException;
import com.amazonclone.amazonclonebackend.exception.QuantityProductUnavailableException;
import com.amazonclone.amazonclonebackend.exception.ResponseMessage;
import com.amazonclone.amazonclonebackend.services.OrderService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService=orderService;
    }//Constructor

    @GetMapping("/all")
    public ResponseEntity<List<Ordination>> getAllOrders(){
        List<Ordination> orders = orderService.findAllOrder();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }//getAllOrders

    @GetMapping("/find/{id}")
    public ResponseEntity<Ordination> getOrderById(@PathVariable("id") Long id){
        try {
            Ordination order = orderService.findOrderById(id);
            return new ResponseEntity<>(order, HttpStatus.OK);
        }catch (QuantityProductUnavailableException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Product quantity unavailable", e);
        }
    }//getOrderById

    @PostMapping("/add")
    public ResponseEntity<Ordination> addOrder(@RequestBody Ordination order){
        Ordination newOrder = orderService.addOrder(order);
        return new ResponseEntity<>(newOrder,HttpStatus.CREATED);
    }//addOrder

    @PutMapping("/update")
    public ResponseEntity<Ordination> updateOrder(@RequestBody Ordination order)
    {
        Ordination upOrder = orderService.updateOrder(order);
        return new ResponseEntity<>(upOrder,HttpStatus.OK);
    }//updateOrder

    @GetMapping("/{startDate}/{endDate}")
    public ResponseEntity getOrdinationInPeriod(@PathVariable("startDate") @DateTimeFormat(pattern = "dd-MM-yyyy") Date start, @PathVariable("endDate") @DateTimeFormat(pattern = "dd-MM-yyyy") Date end) {
        try {
            List<Ordination> result = orderService.getOrdinationInPeriod(start, end);
            if ( result.size() <= 0 ) {
                return new ResponseEntity<>(new ResponseMessage("No results!"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DateWrongRangeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be previous end date XXX!", e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrderById(@PathVariable("id") Long id)
    {
        orderService.deleteOrderById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }//deleteOrderById

}//OrderController

