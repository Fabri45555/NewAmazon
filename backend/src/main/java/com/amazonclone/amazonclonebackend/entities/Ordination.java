package com.amazonclone.amazonclonebackend.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "ordination", schema = "orders")
public class Ordination implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name="id")
    private long id;

    @Basic
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ordination_timestamp")
    private Date ordinationTime;

    @OneToMany(targetEntity = ProductInOrdination.class, mappedBy = "ordination", cascade = CascadeType.MERGE)
    private List<ProductInOrdination> productsInOrdination;

}
