/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it.only('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })

    });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
          let email = `${usuario}@qa.com`



          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": usuario,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               }


          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
          })
     })


     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario('rosangela', 'rosangela@qa')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.email).to.equal("email deve ser um email válido")

               })

     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
          let email = `${usuario}@qa.com`

          cy.cadastrarUsuario('rosangela', email)
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": "rosangela",
                              "email": email,
                              "password": "teste",
                              "administrador": "true"
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                    })
               })
     })

     it('Deve deletar um usuário previamente cadastrado', () => {

          let usuario = `usuario` + `${Math.floor(Math.random() * 100000000)}`
          let email = `${usuario}@qa.com`

          cy.cadastrarUsuario('rosangela', email)
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": "rosangela",
                              "email": email,
                              "password": "teste",
                              "administrador": "true"
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                    })
               })
     });
});