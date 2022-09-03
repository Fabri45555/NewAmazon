package com.amazonclone.amazonclonebackend.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "product", schema = "orders")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private long id;
    private String name;
    private String description;
    private float price;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "barcode", nullable = false, updatable = false)
    private String barcode;
    private String imageUrl;
    private int ratings;

    @OneToMany(targetEntity = ProductInOrdination.class, mappedBy = "product",cascade = CascadeType.MERGE)
    @JsonIgnore
    @ToString.Exclude
    private List<ProductInOrdination> productInOrdination;

}
