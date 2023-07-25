/// <reference types="cypress" />



context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        var quantidade = 6

        cy.get('.post-2559 > .product-block > .caption > .meta > .infor > .name > a').click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.quantity').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        cy.get('#billing_first_name').clear().type('Ignez')
        cy.get('#billing_last_name').clear().type("Modesto")
        cy.get('#select2-billing_country-container').click().type('Brasil').get('[aria-selected]').click()
        cy.get('#billing_address_1').clear().type('Rua Veneza')
        cy.get('#billing_address_2').clear().type('10')
        cy.get('#billing_city').clear().type('Rio de Janeiro')
        cy.get('#select2-billing_state-container').click().type('Rio de Janeiro{enter}')
        cy.get('#billing_postcode').clear().type('21210005')
        cy.get('#billing_phone').clear().type('21985851414')
        cy.get('#billing_email').clear().type('modestoognez@teste.com')

        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')







    })
})
