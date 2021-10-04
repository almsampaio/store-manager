const sinon = require('sinon')
const { expect } = require('chai')

const ProductModel = require('../../models/Product')
const ProductService = require('../../services/Product')

describe('Insere um novo produto no BD (service)', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {}

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct)

      expect(response).to.be.a('object')
    });

    it('o objeto possui uma property json com err dentro', async () => {
      const { json } = await ProductService.create(payloadProduct)

      expect(json).to.have.property('err')
    });


  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      name: 'Example product',
      quantity: 5,
    }

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(ProductModel, 'create')
        .resolves({ id: ID_EXAMPLE })
    })

    after(async () => {
      ProductModel.create.restore()
    })

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct)

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const { json } = await ProductService.create(payloadProduct)

      expect(json).to.have.a.property('id')
    });
  });
});

describe('Atualiza um produto no BD (service)', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {}

    it('retorna um objeto', async () => {
      const response = await ProductService.update(payloadProduct)

      expect(response).to.be.a('object')
    });

    it('o objeto possui uma property json com err dentro', async () => {
      const { json } = await ProductService.update(payloadProduct)

      expect(json).to.have.property('err')
    });


  });

  describe('quando é atualizado com sucesso', () => {
    const payloadProduct = {
      name: 'Example product',
      quantity: 5,
    }

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(ProductModel, 'update')
        .resolves({
          _id: ID_EXAMPLE,
          ...payloadProduct,
        })
    })

    after(async () => {
      ProductModel.update.restore()
    })

    it('retorna um objeto', async () => {
      const response = await ProductService.update({
        _id: '604cb554311d68f491ba5781',
        ...payloadProduct,
      })

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const { json } = await ProductService.update({
        _id: '604cb554311d68f491ba5781',
        ...payloadProduct,
      })

      expect(json).to.have.a.property('_id')
    });
  });
});
