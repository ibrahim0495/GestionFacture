package com.projet.si.web.rest;

import com.projet.si.GestFactureProjectApp;
import com.projet.si.domain.Facture;
import com.projet.si.repository.FactureRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.projet.si.domain.enumeration.TypeFacture;
/**
 * Integration tests for the {@link FactureResource} REST controller.
 */
@SpringBootTest(classes = GestFactureProjectApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FactureResourceIT {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final Instant DEFAULT_DATE_DELIVRANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DELIVRANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_LIMITE_PAIEMENT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_LIMITE_PAIEMENT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONSOMMATION = "AAAAAAAAAA";
    private static final String UPDATED_CONSOMMATION = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT = "AAAAAAAAAA";
    private static final String UPDATED_ETAT = "BBBBBBBBBB";

    private static final TypeFacture DEFAULT_TYPE_FACTURE = TypeFacture.SENELEC;
    private static final TypeFacture UPDATED_TYPE_FACTURE = TypeFacture.SDE;

    @Autowired
    private FactureRepository factureRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFactureMockMvc;

    private Facture facture;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facture createEntity(EntityManager em) {
        Facture facture = new Facture()
            .numero(DEFAULT_NUMERO)
            .dateDelivrance(DEFAULT_DATE_DELIVRANCE)
            .dateLimitePaiement(DEFAULT_DATE_LIMITE_PAIEMENT)
            .consommation(DEFAULT_CONSOMMATION)
            .etat(DEFAULT_ETAT)
            .typeFacture(DEFAULT_TYPE_FACTURE);
        return facture;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facture createUpdatedEntity(EntityManager em) {
        Facture facture = new Facture()
            .numero(UPDATED_NUMERO)
            .dateDelivrance(UPDATED_DATE_DELIVRANCE)
            .dateLimitePaiement(UPDATED_DATE_LIMITE_PAIEMENT)
            .consommation(UPDATED_CONSOMMATION)
            .etat(UPDATED_ETAT)
            .typeFacture(UPDATED_TYPE_FACTURE);
        return facture;
    }

    @BeforeEach
    public void initTest() {
        facture = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacture() throws Exception {
        int databaseSizeBeforeCreate = factureRepository.findAll().size();
        // Create the Facture
        restFactureMockMvc.perform(post("/api/factures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facture)))
            .andExpect(status().isCreated());

        // Validate the Facture in the database
        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeCreate + 1);
        Facture testFacture = factureList.get(factureList.size() - 1);
        assertThat(testFacture.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testFacture.getDateDelivrance()).isEqualTo(DEFAULT_DATE_DELIVRANCE);
        assertThat(testFacture.getDateLimitePaiement()).isEqualTo(DEFAULT_DATE_LIMITE_PAIEMENT);
        assertThat(testFacture.getConsommation()).isEqualTo(DEFAULT_CONSOMMATION);
        assertThat(testFacture.getEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testFacture.getTypeFacture()).isEqualTo(DEFAULT_TYPE_FACTURE);
    }

    @Test
    @Transactional
    public void createFactureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = factureRepository.findAll().size();

        // Create the Facture with an existing ID
        facture.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFactureMockMvc.perform(post("/api/factures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facture)))
            .andExpect(status().isBadRequest());

        // Validate the Facture in the database
        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = factureRepository.findAll().size();
        // set the field null
        facture.setNumero(null);

        // Create the Facture, which fails.


        restFactureMockMvc.perform(post("/api/factures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facture)))
            .andExpect(status().isBadRequest());

        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFactures() throws Exception {
        // Initialize the database
        factureRepository.saveAndFlush(facture);

        // Get all the factureList
        restFactureMockMvc.perform(get("/api/factures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facture.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dateDelivrance").value(hasItem(DEFAULT_DATE_DELIVRANCE.toString())))
            .andExpect(jsonPath("$.[*].dateLimitePaiement").value(hasItem(DEFAULT_DATE_LIMITE_PAIEMENT.toString())))
            .andExpect(jsonPath("$.[*].consommation").value(hasItem(DEFAULT_CONSOMMATION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT)))
            .andExpect(jsonPath("$.[*].typeFacture").value(hasItem(DEFAULT_TYPE_FACTURE.toString())));
    }
    
    @Test
    @Transactional
    public void getFacture() throws Exception {
        // Initialize the database
        factureRepository.saveAndFlush(facture);

        // Get the facture
        restFactureMockMvc.perform(get("/api/factures/{id}", facture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facture.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dateDelivrance").value(DEFAULT_DATE_DELIVRANCE.toString()))
            .andExpect(jsonPath("$.dateLimitePaiement").value(DEFAULT_DATE_LIMITE_PAIEMENT.toString()))
            .andExpect(jsonPath("$.consommation").value(DEFAULT_CONSOMMATION))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT))
            .andExpect(jsonPath("$.typeFacture").value(DEFAULT_TYPE_FACTURE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFacture() throws Exception {
        // Get the facture
        restFactureMockMvc.perform(get("/api/factures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacture() throws Exception {
        // Initialize the database
        factureRepository.saveAndFlush(facture);

        int databaseSizeBeforeUpdate = factureRepository.findAll().size();

        // Update the facture
        Facture updatedFacture = factureRepository.findById(facture.getId()).get();
        // Disconnect from session so that the updates on updatedFacture are not directly saved in db
        em.detach(updatedFacture);
        updatedFacture
            .numero(UPDATED_NUMERO)
            .dateDelivrance(UPDATED_DATE_DELIVRANCE)
            .dateLimitePaiement(UPDATED_DATE_LIMITE_PAIEMENT)
            .consommation(UPDATED_CONSOMMATION)
            .etat(UPDATED_ETAT)
            .typeFacture(UPDATED_TYPE_FACTURE);

        restFactureMockMvc.perform(put("/api/factures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacture)))
            .andExpect(status().isOk());

        // Validate the Facture in the database
        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeUpdate);
        Facture testFacture = factureList.get(factureList.size() - 1);
        assertThat(testFacture.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testFacture.getDateDelivrance()).isEqualTo(UPDATED_DATE_DELIVRANCE);
        assertThat(testFacture.getDateLimitePaiement()).isEqualTo(UPDATED_DATE_LIMITE_PAIEMENT);
        assertThat(testFacture.getConsommation()).isEqualTo(UPDATED_CONSOMMATION);
        assertThat(testFacture.getEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testFacture.getTypeFacture()).isEqualTo(UPDATED_TYPE_FACTURE);
    }

    @Test
    @Transactional
    public void updateNonExistingFacture() throws Exception {
        int databaseSizeBeforeUpdate = factureRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFactureMockMvc.perform(put("/api/factures")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facture)))
            .andExpect(status().isBadRequest());

        // Validate the Facture in the database
        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacture() throws Exception {
        // Initialize the database
        factureRepository.saveAndFlush(facture);

        int databaseSizeBeforeDelete = factureRepository.findAll().size();

        // Delete the facture
        restFactureMockMvc.perform(delete("/api/factures/{id}", facture.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Facture> factureList = factureRepository.findAll();
        assertThat(factureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
