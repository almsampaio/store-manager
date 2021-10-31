const sinon = require('sinon')
const { expect } = require('chai')

const ProductController = require('../../controllers/ProductController')
const ProductModel = require('../../models/Product')
const ProductService = require('../../services/Product')

const SaleController = require('../../controllers/SaleController')
const SaleModel = require('../../models/Sale')
const SaleService = require('../../services/Sale')

describe('Ao chamar o ProductController de create', () => {
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

describe('Ao chamar o ProductController de get', () => {
  describe('quando é chamado getAll', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {}

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductModel, 'getAll')
        .resolves([])
    })

    after(async () => {
      ProductModel.getAll.restore()
    })

    it('é chamado o status de código 200', async () => {
      await ProductController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('retorna um array', async () => {
      await ProductController.getAll(request, response)

      expect(response.json.calledWith({ products: [] })).to.be.equal(true)
    });
  });

  describe('quando é chamado getById', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const fakeProduct = {
        _id: ID_EXAMPLE,
        name: 'Example name',
        quantity: 7
      }

      request.body = {}
      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductModel, 'getById')
        .resolves(fakeProduct)
    })

    after(async () => {
      ProductModel.getById.restore()
    })

    it('é chamado o status de código 200', async () => {
      await ProductController.getById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('retorna o produto buscado', async () => {
      await ProductController.getById(request, response)

      expect(response.json.calledWith({
        _id: '604cb554311d68f491ba5781',
        name: 'Example name',
        quantity: 7
      })).to.be.equal(true)
    });
  });
});

describe('Ao chamar o ProductController de update', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }
      request.body = {
        name: 'Example product',
        quantity: 7
      }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductService, 'update')
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
      ProductService.update.restore()
    })

    it('é chamado o status de código 422', async () => {
      await ProductController.update(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await ProductController.update(request, response)

      expect(response.json.calledWith({err :{message: 'Dados inválidos'}})).to.be.equal(true)
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }
      request.body = {
        name: 'Example product',
        quantity: 7
      }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductService, 'update')
        .resolves({
          status: 200,
          json: request.body
        })
    })

    after(async () => {
      ProductService.update.restore()
    })

    it('é chamado o status com código 200', async () => {
      await ProductController.update(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('é chamado o json com o produto criado', async () => {
      await ProductController.update(request, response)

      expect(response.json.calledWith(request.body)).to.be.equal(true)
    });
  });
});

describe('Ao chamar o ProductController de deleteById', () => {
  describe('quando o id informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductModel, 'deleteById')
        .resolves(null)
    })

    after(async () => {
      ProductModel.deleteById.restore()
    })

    it('é chamado o status de código 422', async () => {
      await ProductController.deleteById(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Wrong id format"', async () => {
      await ProductController.deleteById(request, response)

      expect(response.json.calledWith({err :{message: 'Wrong id format', code: 'invalid_data'}})).to.be.equal(true)
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductModel, 'deleteById')
        .resolves({
          _id: ID_EXAMPLE,
          name: 'Example name',
          quantity: 7
        })
    })

    after(async () => {
      ProductModel.deleteById.restore()
    })

    it('é chamado o status com código 200', async () => {
      await ProductController.deleteById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('é chamado o json com o produto deletado', async () => {
      await ProductController.deleteById(request, response)

      expect(response.json.calledWith({
        _id: '604cb554311d68f491ba5781',
        name: 'Example name',
        quantity: 7
      })).to.be.equal(true)
    });
  });
});

describe('Ao chamar o SaleController de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {}

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleService, 'create')
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
      SaleService.create.restore()
    })

    it('é chamado o status de código 422', async () => {
      await SaleController.create(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await SaleController.create(request, response)

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

      sinon.stub(SaleService, 'create')
        .resolves({
          status: 200,
          json: request.body
        })
    })

    after(async () => {
      SaleService.create.restore()
    })

    it('é chamado o status com código 200', async () => {
      await SaleController.create(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('é chamado o json com a venda criada', async () => {
      await SaleController.create(request, response)

      expect(
        response.json.calledWith(request.body)
      ).to.be.equal(true)
    });
  });
});

describe('Ao chamar o SaleController de get', () => {
  describe('quando é chamado getAll', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {}

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleModel, 'getAll')
        .resolves([])
    })

    after(async () => {
      SaleModel.getAll.restore()
    })

    it('é chamado o status de código 200', async () => {
      await SaleController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('retorna um array', async () => {
      await SaleController.getAll(request, response)

      expect(response.json.calledWith({ sales: [] })).to.be.equal(true)
    });
  });

  describe('quando é chamado getById', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const fakeSale = {
        _id: ID_EXAMPLE,
        itensSold: []
      }

      request.body = {}
      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleModel, 'getById')
        .resolves(fakeSale)
    })

    after(async () => {
      SaleModel.getById.restore()
    })

    it('é chamado o status de código 200', async () => {
      await SaleController.getById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('retorna o produto buscado', async () => {
      await SaleController.getById(request, response)

      expect(response.json.calledWith({
        _id: '604cb554311d68f491ba5781',
        itensSold: []
      })).to.be.equal(true)
    });
  });
});

describe('Ao chamar o SaleController de update', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }
      request.body = [
        {
          productId: 'Example product',
          quantity: 7
        }
      ]

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleService, 'update')
        .resolves({
          status: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: 'Wrong product ID or invalid quantity'
            }
          }
        })
    })

    after(async () => {
      SaleService.update.restore()
    })

    it('é chamado o status de código 422', async () => {
      await SaleController.update(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Wrong product ID or invalid quantity"', async () => {
      await SaleController.update(request, response)

      expect(response.json.calledWith({err : {code: 'invalid_data', message: 'Wrong product ID or invalid quantity'}})).to.be.equal(true)
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }
      request.body = [
        {
          productId: 'Example product',
          quantity: 7
        }
      ]

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleService, 'update')
        .resolves({
          status: 200,
          json: {
            _id: ID_EXAMPLE,
            itensSold: request.body,
          }
        })
    })

    after(async () => {
      SaleService.update.restore()
    })

    it('é chamado o status com código 200', async () => {
      await SaleController.update(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('é chamado o json com a venda criada', async () => {
      await SaleController.update(request, response)

      expect(response.json.calledWith({
          _id: '604cb554311d68f491ba5781',
          itensSold: request.body,
      })).to.be.equal(true)
    });
  });
});

describe('Ao chamar o SaleController de deleteById', () => {
  describe('quando o id informado não é válido', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(SaleModel, 'deleteById')
        .resolves(null)
    })

    after(async () => {
      SaleModel.deleteById.restore()
    })

    it('é chamado o status de código 422', async () => {
      await SaleController.deleteById(request, response)

      expect(response.status.calledWith(422)).to.be.equal(true)
    });

    it('é chamado o json com a mensagem "Wrong id format"', async () => {
      await SaleController.deleteById(request, response)

      expect(response.json.calledWith({err :{message: 'Wrong sale ID format', code: 'invalid_data'}})).to.be.equal(true)
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {}
    const request = {}

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      request.params = { id: ID_EXAMPLE }

      response.status = sinon.stub()
        .returns(response)

      response.json = sinon.stub()
        .returns()

      sinon.stub(ProductModel, 'getById')
        .resolves({
          _id: 'Example id',
          name: 'Example product',
          quantity: 7
        })
      sinon.stub(ProductModel, 'update')
        .resolves({
          _id: 'Example id',
          name: 'Example product',
          quantity: 9
        })
      sinon.stub(SaleModel, 'deleteById')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: [
            {
              productId: 'Example id',
              quantity: 2
            }
          ]
        })
    })

    after(async () => {
      SaleModel.deleteById.restore()
      ProductModel.update.restore()
      ProductModel.getById.restore()
    })

    it('é chamado o status com código 200', async () => {
      await SaleController.deleteById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    it('é chamado o json com o produto deletado', async () => {
      await SaleController.deleteById(request, response)

      expect(response.json.calledWith({
        _id: '604cb554311d68f491ba5781',
        itensSold: [
          {
            productId: 'Example id',
            quantity: 2
          }
        ]
      })).to.be.equal(true)
    });
  });
});
