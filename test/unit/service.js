const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../services/Products');
const ProductsModel = require('../../models/Products');

describe('Insere um novo produto no banco', () => {
  describe('Payload inválido', () => {

    it('Quando campo "quantity" ou o campo name são invalidos é inválido', async () => {
      const response = ProductsService.dataProducts('produto', '2');
      const response1 = ProductsService.dataProducts('produto', 0);
      const response2 = ProductsService.dataProducts('produto', -1);
      const response3 = ProductsService.dataProducts('pro', 1);
      const responsecorrect = ProductsService.dataProducts('produto', 5);
 
      expect(response.err.message).to.be.equals('"quantity" must be a number');
      expect(response.status).to.be.equals(422);
      expect(response1.err.message).to.be.equals('"quantity" must be larger than or equal to 1');
      expect(response1.status).to.be.equals(422);
      expect(response2.err.message).to.be.equals('"quantity" must be larger than or equal to 1');
      expect(response2.status).to.be.equals(422);
      expect(response3.err.message).to.be.equals('"name" length must be at least 5 characters long');
      expect(response3.status).to.be.equals(422);
      expect(responsecorrect).to.be.equals(false);

    })
  });

  describe('Quando é inserido com seucesso', () => {
    const payloadProduct = {
      name: 'nome do produto',
      quantity: 5,
    };

    before(() => {
      sinon.stub(ProductsModel, 'create').resolves({ _id: '604cb554311d68f491ba5781', ...payloadProduct });
    });

    after(() => {
      ProductsModel.create.restore();
    });

    it('verifica se o produto adicionado já existe no banco', async () => {
      await ProductsService.addProduct(payloadProduct.name, payloadProduct.quantity);
      const response = await ProductsService.addProduct(payloadProduct.name, payloadProduct.quantity);
      expect(response.err.message).to.be.equals('Product already exists');
      expect(response.status).to.be.equals(422);
    });
    it('retorna um objeto', async () => {
      const response = await ProductsModel.create(payloadProduct.name, payloadProduct.quantity);
      expect(response).to.be.a('object');
      expect(response).to.be.keys('_id', 'name', 'quantity');
    });

  });
  describe('Lendos dados do banco', () => {
    const payloadProduct = {
      name: 'nome do produto',
      quantity: 5,
    };
    
    before(() => {
      sinon.stub(ProductsModel, 'create').resolves({
        _id: '604cb554311d68f491ba5781',
        ...payloadProduct,
      })
    });
    
    after(() => {
      ProductsModel.create.restore();
    });
  
    it('Retorna um array com todos os produtos', async () => {
      const response = await ProductsService.getAll();
      expect(response).to.be.a('array');
    });
  
    it('Retorna apenas um produto', async () => {
      const creatingProduct = await ProductsModel.create(payloadProduct.name, payloadProduct.quantity);
      expect(creatingProduct).to.be.a('object');
      expect(creatingProduct.name).to.be.equals('nome do produto');
    });
  
  });
  describe('deletando um produto', () => {
    const payloadProduct = {
      name: 'nome do produto',
      quantity: 5,
    };
    
    before(() => {
      sinon.stub(ProductsModel, 'create').resolves({
        _id: '604cb554311d68f491ba5781',
        ...payloadProduct,
      })
    });
    
    after(() => {
      ProductsModel.create.restore();
    });
    it('deletando com sucesso', async () => {
      const creatingProduct = await ProductsModel.create(payloadProduct.name, payloadProduct.quantity);
      const dele = await ProductsService.deleteProductById(creatingProduct._id);
      expect(dele.result.ok).to.be.equals(1);
    });
    it('veirfica se o id do produto a ser deletado está errado', async () => {
      const creatingProduct = await ProductsModel.create(payloadProduct.name, payloadProduct.quantity);
      const dele = await ProductsService.deleteProductById(creatingProduct);
      expect(dele.err.message).to.be.equals('Wrong id format');
      expect(dele.status).to.be.equals(422);
    });
  });
  describe('verifica a atualização de um produto', () => {
    const payloadProduct = {
      name: 'nome do produto',
      quantity: 5,
    };
    
    before(() => {
      sinon.stub(ProductsModel, 'updateProduct').resolves({
        _id: '604cb554311d68f491ba5781',
        ...payloadProduct,
      })
    });
    
    after(() => {
      ProductsModel.updateProduct.restore();
    });

    it('verifica que foi atualizado com sucesso', async () => {
      const creatingProduct = await ProductsModel.create(payloadProduct.name, payloadProduct.quantity);
      await ProductsService.updateProductByid('nome atualizado', 8, creatingProduct._id);
      const product = await ProductsModel.getProductId(creatingProduct._id);
      expect(product.name).to.be.equals('nome atualizado');      
    });
  });
});
