const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../services/productService');
const ProductModel = require('../../models/productModel')


describe('Insere um novo produto no Banco de dados', () => {
  describe('quando o produto é vazio', () => {
    const produto = {};

    it('retorna um object', async() => {
      const response = await ProductService.create(produto);

      expect(response).to.be.a('object');
    });

    it('o object contém "err"', async() => {
      const response = await ProductService.create(produto);

      expect(response).to.be.equal({ err: { code: 'invalid_data',
      message: '"quantity" must be a number' } });
    });
  });
  describe('quando a quantidade eh invalida', () => {
    before(() => {
      sinon.stub(ProductModel, 'findOneByName')
      .resolves(true);
    });

    after (() => {
      ProductModel.findOneByName.restore();
    });
    it('quando a quantidade nao eh numero inteiro', async () => {
      const produto = {
        name: 'nome produto',
        quantity: 1.99,
      }
      const response = await ProductService.create(produto);

      expect(response).to.be.equal({ err: { code: 'invalid_data',
      message: '"quantity" must be a number' } });
    });
    it('quando a quantidade eh menor ou igual a 0', async () => {
      const produto = {
        name: 'nome produto',
        quantity: -1,
      }
      const response = await ProductService.create(produto);

      expect(response).to.be.equal({ err: { code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } });
    });
  });
  describe('quando o nome eh invalido', () => {
    before(() => {
      sinon.stub(ProductModel, 'findOneByName')
      .resolves(undefined);
    });

    after (() => {
      ProductModel.findOneByName.restore();
    });
    it('quando o nome nao eh uma string', async () => {
      const produto = {
        name: 12345567,
        quantity: 999,
      };
    const response = await ProductService.create(produto);

    expect(response).to.be.equal({ err: { code: 'invalid_data',
    message: '"name" must be a string' } });
    });
  
    it('quando o nome tem menos de 6 caracteres', async () => {
      const produto = {
        name: '12345',
        quantity: 999,
      }
    const response = await ProductService.create(produto);

    expect(response).to.be.equal({ err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' } });
    });
    it('quando o produto ja existe', async () => {
      const produto = {
        name: '123456',
        quantity: 999,
      }
      await ProductService.create(produto);

      const response = await ProductService.create(produto);
      expect(response).to.be.equal({ err: { code: 'invalid_data',
      message: 'Product already exists' } });
    })
  });
  describe('quando é inserido com sucesso', () => {
    const produto = {
      name: 'exemplo produto',
      quantity: 999,
    };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(ProductService, 'create')
      .resolves({ id: ID_EXAMPLE, name: produto.name, quantity: produto.quantity })
    });

    after (() => {
      ProductService.create.restore();
    })
    
    it('Retorna um objeto', async () => {
      const response = await ProductService.create(produto);

      expect(response).to.be.a('object');
    });

    it('O objeto tem todas as propriedades do produto inclusive o ID criado', async () => {
      const response = await ProductService.create(produto);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity')
    });
    it('O objeto tem o ID correto', async () => {
      const response = await ProductService.create(produto);
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      expect(response.id).to.be.equal(ID_EXAMPLE);
    });
    it('O objeto tem o name correto', async () => {
      const response = await ProductService.create(produto);
      expect(response.name).to.be.equal('exemplo produto');
    });
    it('O objeto tem o quantity correto', async () => {
      const response = await ProductService.create(produto);
      expect(response.quantity).to.be.equal(999);
    });
  });
});