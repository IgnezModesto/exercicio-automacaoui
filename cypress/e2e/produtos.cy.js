/// <reference types = "cypress"/>

describe('Funcionalidade de Página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            //.first()
            .eq(3)
            .click()
    });

    it.only('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 20

        cy.get('[class="product-block grid"]')
            .eq(3).click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Black').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Josie Yoga Jacket” foram adicionados no seu carrinho.')
    });
})