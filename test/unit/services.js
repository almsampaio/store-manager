const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

const mockId = '604cb554311d68f491ba5781';

describe('products - testa o service addProduct', () => {
  describe('quando o post é inválido', () => {
    it('quando o nome já existe', async () => {
      sinon.stub(productsModel, 'getByName').resolves([{
        _id: mockId,
        name: 'produto',
        quantity: 50,
      }]);

      const addedProduct = await productsService.addProduct({
        name: 'produto',
        quantity: 10,
      })

      expect(addedProduct).to.deep.equal({
        code: 'invalid_data',
        message: 'Product already exists'
      });
      productsModel.getByName.restore();
    })

    it('quando o nome é inválido', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const addedProduct = await productsService.addProduct({
        name: 'zé',
        quantity: 10,
      })

      expect(addedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      });
      productsModel.getByName.restore();
    });

    it('quando a quantidade não é um numero', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const addedProduct = await productsService.addProduct({
        name: 'produto',
        quantity: 'oi',
      })

      expect(addedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"quantity" must be a number'
      });
      productsModel.getByName.restore();
    });

    it('quando a quantidade é um numero inválido', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const addedProduct = await productsService.addProduct({
        name: 'produto',
        quantity: -5,
      })

      expect(addedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      });
      productsModel.getByName.restore();
    });
  });

  describe('quando o post é válido', () => {
    it('adição válida', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);
      sinon.stub(productsModel, 'addProduct').resolves({
        _id: mockId,
        name: 'produto',
        quantity: 10
      });

      const addedProduct = await productsService.addProduct({
        name: 'produto',
        quantity: 10,
      })

      expect(addedProduct).to.deep.equal({
        _id: mockId,
        name: 'produto',
        quantity: 10
      });

      productsModel.getByName.restore();
      productsModel.addProduct.restore();
    });
  });
});

describe('products - testa o service updateProduct', () => {
  describe('quando o update é inválido', () => {
    it('quando o nome é inválido', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const updatedProduct = await productsService.updateProduct({
        id: mockId,
        name: 'zé',
        quantity: 10,
      })

      expect(updatedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      });
      productsModel.getByName.restore();
    });

    it('quando a quantidade não é um numero', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const updatedProduct = await productsService.updateProduct({
        id: mockId,
        name: 'produto',
        quantity: 'oi',
      })

      expect(updatedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"quantity" must be a number'
      });
      productsModel.getByName.restore();
    });

    it('quando a quantidade é um numero inválido', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);

      const updatedProduct = await productsService.updateProduct({
        id: mockId,
        name: 'produto',
        quantity: -5,
      })

      expect(updatedProduct).to.deep.equal({
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      });
      productsModel.getByName.restore();
    });
  });

  describe('quando o update é válido', () => {
    it('update válido', async () => {
      sinon.stub(productsModel, 'getByName').resolves([]);
      sinon.stub(productsModel, 'updateProduct').resolves({
        _id: mockId,
        name: 'produto',
        quantity: 15
      });

      const updatedProduct = await productsService.updateProduct({
        id: mockId,
        name: 'produto',
        quantity: 15,
      })

      expect(updatedProduct).to.deep.equal({
        _id: mockId,
        name: 'produto',
        quantity: 15
      });

      productsModel.getByName.restore();
      productsModel.updateProduct.restore();
    });
  })
});

describe('products - testa o deleteProduct', () => {
  describe('tentando deletar um produto inexistente', () => {
    it('produto inexistente', async () => {
      sinon.stub(productsModel, 'getById').resolves(null);

      const deletedProduct = await productsService.deleteProduct(mockId);

      expect(deletedProduct).to.deep.equal({
        code: 'invalid_data',
        message: 'Wrong id format'
      })
      productsModel.getById.restore();
    });
  });

  describe('tentando deletar um produto que existe', () => {
    it('deleta com sucesso', async () => {
      sinon.stub(productsModel, 'getById').resolves({
        _id: mockId,
        name: 'produto',
        quantity: 10,
      });
      sinon.stub(productsModel, 'deleteProduct').resolves({
        _id: mockId
      })

      const deletedProduct = await productsService.deleteProduct(mockId);

      expect(deletedProduct).to.deep.equal({
        _id: mockId,
        name: 'produto',
        quantity: 10
      })
      productsModel.getById.restore();
      productsModel.deleteProduct.restore();
    });
  });
});
