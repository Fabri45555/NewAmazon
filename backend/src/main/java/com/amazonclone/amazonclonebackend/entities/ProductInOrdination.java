package com.amazonclone.amazonclonebackend.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;
import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "product_in_ordination", schema = "orders")
public class ProductInOrdination{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,updatable = false)
    private Long id;

    @Basic
    @Column(name = "quantity")
    private Integer quantity;

    @JsonBackReference(value = "ordination")
    @ManyToOne(targetEntity = Ordination.class,cascade = CascadeType.MERGE)//targetEntity = Ordination.class)
    @JoinColumn(name="related_ordination")
    @JsonIgnore
    @ToString.Exclude
    private Ordination ordination;

    @JsonBackReference(value = "product")
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product")
    @JsonIgnore
    @ToString.Exclude
    private Product product;


    public ProductInOrdination(long id,int quantity,Ordination ordination, Product product){
        this.id=id;
        this.quantity=quantity;
        this.ordination=ordination;
        this.product=product;
    }

    public ProductInOrdination() {}

    public void setOrdination(Ordination ordination) {
        this.ordination = ordination;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
