const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

const salesService = require('../../services/salesService');
const salesModel = require('../../models/salesModel');

const PRODUCT_INSERT_INVALID_FORMAT = {
  wrongKey: "teste"
}

const INSERT_PRODUCT_WITH_INVALID_NAME = {
  name: "Pro",
  quantity: 100,
};

const INSERT_PRODUCT_QUANTITY_EQUAL_ZERO = {
  name: "Produto do Batista",
  quantity: 0,
};

const INSERT_PRODUCT_QUANTITY_SUB_ZERO = {
  name: "Produto do Batista",
  quantity: -1,
};

const INSERT_PRODUCT_QUANTITY_STRING = {
  name: "Produto do Batista",
  quantity: '2',
};

const INSERT_PRODUCT_OK = {
  name: "Produto do Batista",
  quantity: 100
};


const SALE_INSERT_INVALID_FORMAT = {
    productId: "5f43ba273200020b101fe49f",
    quantity: 0
}

const SALE_INSERT_QUANTITY_ZERO = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 0
  }
]

const SALE_INSERT_QUANTITY_STRING = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: '2'
  } ,
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 0
  }
]

const SALE_INSERT_QUANTITY_ONLY_ONE_POSITION_OK = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: '2'
  }
]
const SALE_INSERT_OK = [
  {
    productId: "f43ba273200020b101fe49f", // Esse id também é referente a um product existente na coleção ficticia products
    quantity: 2
  }
]

const SALE_ALL_TWO_POSITIONS_OK = [
  {
    productId: "f43ba273200020b101fe49", // Esse id também é referente a um product existente na coleção ficticia products
    quantity: 2,
  },

  {
    productId: "5f43ba273233320b101fe45d", // Esse não existe na coleção ficticia products
    quantity: 1
  }
]

const SALE_ID_NOT_EXISTS_IN_PRODUCTS = [
  {
    productId: "5f43ba273233320b101fe45d", // Esse não existe na coleção ficticia products
    quantity: 1
  }
]



describe('Testes da camada Service', () => {

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {

      describe('Será validado o correto formato do input', () => {
        it('Se a entrada for diferente de um objeto, as chaves "name" e "quantity", retorna a um json com a messagem de erro', async () => {
          const response = await salesService.createSale(PRODUCT_INSERT_INVALID_FORMAT);
          expect(response).to.be.a('object');
        });
      });
      describe('quando é inserido um "name" com menos de 5 caracteres', () => {
        it('retorna um objeto', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "name" inválido', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });

      before(async () => {
        const productAlreadyExists = [{
          _id: "f43ba273200020b101fe49f",
          name: "Produto do Batista",
          quantity: 334
        }];

        sinon.stub(productsModel, 'getAllProdutcts').resolves(productAlreadyExists);
      });


      describe('Verifica que não é possível criar um produto com um "name" ja existente', () => {

        it('Quando inserido um nome ja existente, retorna um objeto', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_OK);

          expect(response).to.be.a('object');
        });
        it('tal objeto possui um objeto json com a mensagem com o erro de "name" inválido', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_OK);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });

      describe('quando é inserido um "quantity" menor ou igual a zero', () => {

        it('retorna um objeto', async () => {
          const responseToZero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_EQUAL_ZERO);
          expect(responseToZero ).to.be.a('object');
          const responseToSubzero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_SUB_ZERO);
          expect(responseToSubzero).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "quantity" inválido', async () => {
          const responseToZero  = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_EQUAL_ZERO);
          const responseToZeroErr = responseToZero.err;
          expect(responseToZero).to.have.a.property('err');
          expect(responseToZeroErr).to.have.a.property('code');
          expect(responseToZeroErr).to.have.a.property('message');

          const responseToSubzero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_SUB_ZERO);
          const responseToSubzeroErr = responseToSubzero.err;
          expect(responseToSubzero).to.have.a.property('err');
          expect(responseToSubzeroErr).to.have.a.property('code');
          expect(responseToSubzeroErr).to.have.a.property('message');
        });
      });

      describe('quando é inserido uma string no "quantity"', () => {

        it('retorna um objeto', async () => {
          const responseToZero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_STRING);
          expect(responseToZero ).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "quantity" inválido', async () => {
          const responseToZero  = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_STRING);
          const responseToZeroErr = responseToZero.err;
          expect(responseToZero).to.have.a.property('err');
          expect(responseToZeroErr).to.have.a.property('code');
          expect(responseToZeroErr).to.have.a.property('message');
        });
      });
    });
  });

  describe('Testando as requisições com a coleção "Sales"', () => {
    describe('Teste da Requisição POST - Inserindo um novo "Sale" no BD', () => {
      describe('Será validade o correto formato do input', () => {
        it('Se a entrada for diferente de um array, retorna o json com a mensagem de erro', async () => {
          const response = await salesService.createSale(SALE_INSERT_INVALID_FORMAT);
          expect(response).to.be.a('object');
        });
      });

      describe('Será validado que não é possível cadastrar compras com campo quantidade menor que zero ou que seja escrita uma string nesse campo', () => {
        it('Testando valor menor igual a zero. Deve retornar um objeto com contendo o erro e a mensagem sobre o erro', async () => {
          const response = await salesService.createSale(SALE_INSERT_QUANTITY_ZERO);
          expect(response).to.be.a('object');
        });
        it('Testando quantity como string. Deve retornar um objeto com contendo o erro e a mensagem sobre o erro', async () => {
          const response = await salesService.createSale(SALE_INSERT_QUANTITY_ONLY_ONE_POSITION_OK);
          expect(response).to.be.a('object');
        });
        it('Testando se retorna um erro dos acima, para entrada com dois "sales", caso um sale esteja correto e o outro esteja com o quantity errado', async () => {
          const response = await salesService.createSale(SALE_INSERT_QUANTITY_STRING);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "quantidade" inválida', async () => {
          const response = await salesService.createSale(SALE_INSERT_QUANTITY_ZERO);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });


        describe('Valida se é possível inserir um ou varios "sales" simultâneos no banco de dados', () => {


          before(async () => {
            const saleTwoProducts = {
              "_id": "5f43ba333200020b101fe4a0",
              "itensSold": [
                {
                  productId: "5f43ba273200020b101fe49f",
                  quantity: 2,
                },
                {
                  productId: "5f43ba273233320b101fe45d",
                  quantity: 1
                }

              ]
            }
            sinon.stub(salesModel, 'createSale').resolves(saleTwoProducts);
          });

          after(async () => {
            salesModel.createSale.restore();
          });


          describe('Caso insira um "Sale" onde os parâmetros seja válidos,', () => {
            it('retorna um objeto contantendo o _id e o array itensSold', async () => {
              const response = await salesService.createSale(SALE_ALL_TWO_POSITIONS_OK);
              expect(response).to.be.a('object');
            });
          });
      });

      describe('Valida se o id digitado existe na coleção products', () => {
        before(async () => {
          const productAlreadyExists = [{
            _id: "f43ba273200020b101fe49f",
            name: "Produto do Batista",
            quantity: 334
          }];

          sinon.stub(productsModel, 'getAllProdutcts').resolves(productAlreadyExists);
        });

        after(async () => {
          salesModel.createSale.restore();
        });
      });

      it('Caso não exista. Deve retornar um objeto com contendo o erro e a mensagem sobre o erro', async () => {
        const response = await salesService.createSale(SALE_ID_NOT_EXISTS_IN_PRODUCTS);
        expect(response).to.be.a('object');
      });
      it('Testando quantity como string. Deve retornar um objeto com contendo o erro e a mensagem sobre o erro', async () => {
        const response = await salesService.createSale(SALE_ID_NOT_EXISTS_IN_PRODUCTS);
        expect(response).to.be.a('object');
      });

    });
  });
});
