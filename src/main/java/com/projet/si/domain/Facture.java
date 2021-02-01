package com.projet.si.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.projet.si.domain.enumeration.TypeFacture;

/**
 * A Facture.
 */
@Entity
@Table(name = "facture")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Facture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false, unique = true)
    private Integer numero;

    @Column(name = "date_delivrance")
    private Instant dateDelivrance;

    @Column(name = "date_limite_paiement")
    private Instant dateLimitePaiement;

    @Column(name = "consommation")
    private String consommation;

    @Column(name = "etat")
    private String etat;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_facture")
    private TypeFacture typeFacture;

    @OneToMany(mappedBy = "facture")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Reclamation> factures = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "factures", allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Facture numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Instant getDateDelivrance() {
        return dateDelivrance;
    }

    public Facture dateDelivrance(Instant dateDelivrance) {
        this.dateDelivrance = dateDelivrance;
        return this;
    }

    public void setDateDelivrance(Instant dateDelivrance) {
        this.dateDelivrance = dateDelivrance;
    }

    public Instant getDateLimitePaiement() {
        return dateLimitePaiement;
    }

    public Facture dateLimitePaiement(Instant dateLimitePaiement) {
        this.dateLimitePaiement = dateLimitePaiement;
        return this;
    }

    public void setDateLimitePaiement(Instant dateLimitePaiement) {
        this.dateLimitePaiement = dateLimitePaiement;
    }

    public String getConsommation() {
        return consommation;
    }

    public Facture consommation(String consommation) {
        this.consommation = consommation;
        return this;
    }

    public void setConsommation(String consommation) {
        this.consommation = consommation;
    }

    public String getEtat() {
        return etat;
    }

    public Facture etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public TypeFacture getTypeFacture() {
        return typeFacture;
    }

    public Facture typeFacture(TypeFacture typeFacture) {
        this.typeFacture = typeFacture;
        return this;
    }

    public void setTypeFacture(TypeFacture typeFacture) {
        this.typeFacture = typeFacture;
    }

    public Set<Reclamation> getFactures() {
        return factures;
    }

    public Facture factures(Set<Reclamation> reclamations) {
        this.factures = reclamations;
        return this;
    }

    public Facture addFacture(Reclamation reclamation) {
        this.factures.add(reclamation);
        reclamation.setFacture(this);
        return this;
    }

    public Facture removeFacture(Reclamation reclamation) {
        this.factures.remove(reclamation);
        reclamation.setFacture(null);
        return this;
    }

    public void setFactures(Set<Reclamation> reclamations) {
        this.factures = reclamations;
    }

    public Client getClient() {
        return client;
    }

    public Facture client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facture)) {
            return false;
        }
        return id != null && id.equals(((Facture) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Facture{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", dateDelivrance='" + getDateDelivrance() + "'" +
            ", dateLimitePaiement='" + getDateLimitePaiement() + "'" +
            ", consommation='" + getConsommation() + "'" +
            ", etat='" + getEtat() + "'" +
            ", typeFacture='" + getTypeFacture() + "'" +
            "}";
    }
}
