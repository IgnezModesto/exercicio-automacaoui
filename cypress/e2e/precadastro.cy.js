/// <reference types="cypress" />

const { type, faker } = require('@faker-js/faker');


describe('Funcionalidade Pré Cadastro', () => {


    it('Deve completar o pré cadastro com sucesso', () => {
        
        let nomeFaker = faker.person.firstName()
        let sobrenomeFaker = faker.person.lastName()
        let emailFaker = faker.internet.email() 
        

        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('alunoebac10@')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')



    });


});
