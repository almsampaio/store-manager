const sinon = require('sinon')
const { expect } = require('chai')

const ProductController = require('../../controllers/ProductController')
const ProductService = require('../../services/Product')

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {}

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductService, 'create')
        .resolves(false)
    })

    after(async () => {
      ProductService.create.restore()
    })

    it('é chamado o status de código 400', async () => {
      await ProductController.create(request, response)

      expect(response.status.calledWith(400)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await ProductController.create(request, response)

      expect(response.json.calledWith({message: 'Dados inválidos'})).to.be.equal(true)
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {
        name: 'Example product',
        quantity: 7
      }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductService, 'create')
        .resolves(true)
    })

    after(async () => {
      ProductService.create.restore()
    })

    it('é chamado o status com código 201', async () => {
      await ProductController.create(request, response)

      expect(response.status.calledWith(201)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Produto criado com sucesso!', async () => {
      await ProductController.create(request, response)

      expect(response.json.calledWith({message: 'Produto criado com sucesso!'})).to.be.equal(true)
    });
  });
});

