const sinon = require('sinon')
const { expect } = require('chai')

const ProductModel = require('../../models/Product')
const ProductService = require('../../services/Product')

describe('Insere um novo produto no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {}

    it('retorna um boolean', async () => {
      const response = await ProductService.create(payloadProduct)

      expect(response).to.be.a('boolean')
    });

    it('o boolean contém false', async () => {
      const response = await ProductService.create(payloadProduct)

      expect(response).to.be.equal(false)
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
      const response = await ProductService.create(payloadProduct)

      expect(response).to.have.a.property('id')
    });
  });

});
