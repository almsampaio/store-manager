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
        .resolves({
          status: 422,
          json: {
            err: {
              message: 'Dados inválidos'
            }
          }
        })
    })

    after(async () => {
      ProductService.create.restore()
    })

    it('é chamado o status de código 422', async () => {
      await ProductController.create(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await ProductController.create(request, response)

      expect(response.json.calledWith({err :{message: 'Dados inválidos'}})).to.be.equal(true)
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
        .resolves({
          status: 201,
          json: request.body
        })
    })

    after(async () => {
      ProductService.create.restore()
    })

    it('é chamado o status com código 201', async () => {
      await ProductController.create(request, response)

      expect(response.status.calledWith(201)).to.be.equal(true)
    });

    it('é chamado o json com o produto criado', async () => {
      await ProductController.create(request, response)

      expect(
        response.json.calledWith(request.body)
      ).to.be.equal(true)
    });
  });
});

