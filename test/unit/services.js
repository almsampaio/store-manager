const sinon = require('sinon');
const { expect } = require('chai');



const productsService = require('../../models/productsModel');
const salesService = require('../../models/salesModel');

const VALIDATION_PRODUCT_INSERT = {
  name: "Produto do Batista",
  quantity: 100
};


const VALIDATION_SALE_INSERT = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 2
  }
]

describe('Testes da camada Service', () => {


  before(async () => {

  });

  after(async () => {

  });

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui o "id" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('id');
        });
        it('tal objeto possui o "name" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('name');
        });
        it('tal objeto possui o "quantity" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('quantity');
        });
      });
    });
  });

  describe('Testando as requisições com a coleção "Sales"', () => {
    describe('Teste da Requisição POST - Inserindo uma nova venda no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          console.log('meu teste   ',response)
          expect(response).to.be.a('object');
        });
        it('tal objeto possui um "_id" do novo produto inserido', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          expect(response).to.have.a.property('_id');
        });
        it('tal objeto possui a propriedade "itensSold" que é um array', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          expect(response).to.have.a.property('itensSold');
        });
        it('"itensSold" possui possui a propriedade "productId"', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          const respItensSold = response.itensSold[0];
          expect(respItensSold).to.have.a.property('productId');
        });
        it('"itensSold" possui possui a propriedade "quantity"', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          const respItensSold = response.itensSold[0];
          expect(respItensSold).to.have.a.property('quantity');
        });
      });
    });
  });
});
