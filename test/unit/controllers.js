const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/products');
const productsService = require('../../services/products');

describe('Ao chamar o controller de products', () => {
  describe('chamando a função "getProducts"', () => {
    const request = {};
    const response = {};

    const mockReturn = {
      products: [{
        _id: '12313213123123131332131',
        name: 'produto teste',
        quantity: 10,
      }],
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves(mockReturn);
    });

    after(() => productsService.getProducts.restore());

    it('retorna status 200', async () => {
      await productsController.getProducts(request, response, () => {});

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna produto', async () => {
      await productsController.getProducts(request, response, () => {});

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('chamando a função "createProduct"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        products: {
          _id: '12313213123123131332131',
          name: 'produto teste',
          quantity: 10,
        },
      };

      before(() => {
        request.body = {
          name: 'produto teste',
          quantity: 10
        }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves(mockReturn);
      });

      after(() => productsService.createProduct.restore());

      it('chama a função "productsService.createProduct', async () => {
        await productsController.createProduct(request, response, () => {});

        const { name, quantity } = request.body;

        expect(productsService.createProduct.calledWith(name, quantity)).to.be.equal(true);
      });

      it('retorna status 201', async () => {
        await productsController.createProduct(request, response, () => {});

        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('retorna objeto criado', async () => {
        await productsController.createProduct(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = { message: '"quantity" must be larger than or equal to 1' };

      before(() => {
        request.body = {
          name: 'produto teste',
          quantity: 10
        }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves(mockReturn);
      });

      after(() => productsService.createProduct.restore());

      it('chama a função "productsService.createProduct', async () => {
        await productsController.createProduct(request, response, () => {});

        const { name, quantity } = request.body;

        expect(productsService.createProduct.calledWith(name, quantity)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await productsController.createProduct(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await productsController.createProduct(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "getProductsById"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        products: {
          _id: '222222222222222222222222',
          name: 'produto teste',
          quantity: 5,
        },
      };

      before(() => {
        request.params = {
          id: '222222222222222222222222',
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProductById').resolves(mockReturn);
      });

      after(() => productsService.getProductById.restore());

      it('chama a função "productsService.getProductById', async () => {
        await productsController.getProductById(request, response, () => {});

        const { id } = request.params;

        expect(productsService.getProductById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await productsController.getProductById(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna produto encontrado', async () => {
        await productsController.getProductById(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = { message: 'Wrong id format' };

      before(() => {
        request.params = { id: 0 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProductById').resolves(mockReturn);
      });

      after(() => productsService.getProductById.restore());

      it('chama a função "productsService.updateProduct', async () => {
        await productsController.getProductById(request, response, () => {});

        const { id } = request.params;

        expect(productsService.getProductById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await productsController.getProductById(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await productsController.getProductById(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "updateProduct"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        products: {
          _id: '3333333333333',
          name: 'produto teste',
          quantity: 20,
        },
      };

      before(() => {
        request.params = {
          id: '3333333333333',
        };

        request.body = {
          name: 'produto teste',
          quantity: 20,
        }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'updateProduct').resolves(mockReturn);
      });

      after(() => productsService.updateProduct.restore());

      it('chama a função "productsService.updateProduct', async () => {
        await productsController.updateProduct(request, response, () => {});

        const { id } = request.params;
        const { name, quantity } = request.body;

        expect(productsService.updateProduct.calledWith(id, name, quantity)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await productsController.updateProduct(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna produto atualizado', async () => {
        await productsController.updateProduct(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = { message: 'Wrong id format' };

      before(() => {
        request.params = { id: 0 }
        request.body = {
          name: 'produto teste',
          quantity: 100,
        }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'updateProduct').resolves(mockReturn);
      });

      after(() => productsService.updateProduct.restore());

      it('chama a função "productsService.updateProduct', async () => {
        await productsController.updateProduct(request, response, () => {});

        const { id } = request.params;
        const { name, quantity } = request.body;

        expect(productsService.updateProduct.calledWith(id, name, quantity)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await productsController.updateProduct(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await productsController.updateProduct(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "deleteById"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        products: {
          _id: '3333333333333',
          name: 'produto teste',
          quantity: 20,
        },
      };

      before(() => {
        request.params = {
          id: '3333333333333',
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'deleteById').resolves(mockReturn);
      });

      after(() => productsService.deleteById.restore());

      it('chama a função "productsService.deleteById', async () => {
        await productsController.deleteById(request, response, () => {});

        const { id } = request.params;

        expect(productsService.deleteById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await productsController.deleteById(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna objeto deletado', async () => {
        await productsController.deleteById(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = { message: 'Wrong id format' };

      before(() => {
        request.params = { id: 0 }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'deleteById').resolves(mockReturn);
      });

      after(() => productsService.deleteById.restore());

      it('chama a função "productsService.deleteById', async () => {
        await productsController.deleteById(request, response, () => {});

        const { id } = request.params;

        expect(productsService.deleteById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await productsController.deleteById(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await productsController.deleteById(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});

const salesController = require('../../controllers/sales')
const salesService = require('../../services/sales')

describe('Ao chamar o controller de sales', () => {
  describe('chamando a função "createSales"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        _id: '222222222222222',
        itemSold: {
          productId: '33333333333333',
          quantity: 2,
        },
      };

      before(() => {
        request.body = {
          productId: '33333333333333',
          quantity: 2,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'createSales').resolves({ result: mockReturn });
      });

      after(() => salesService.createSales.restore());

      it('chama a função "salesService.createSales', async () => {
        await salesController.createSales(request, response, () => {});

        const itensSold = request.body;

        expect(salesService.createSales.calledWith(itensSold)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await salesController.createSales(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna venda criada', async () => {
        await salesController.createSales(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });

    describe('com erro de dados inválidos', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };

      before(() => {
        request.body = {
          productId: '33333333333333',
          quantity: 2,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'createSales').resolves({ error: mockReturn });
      });

      after(() => salesService.createSales.restore());

      it('chama a função "salesService.createSales', async () => {
        await salesController.createSales(request, response, () => {});

        const itensSold = request.body;

        expect(salesService.createSales.calledWith(itensSold)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await salesController.createSales(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await salesController.createSales(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });

    describe('com erro de estoque', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell', 
        },
      };

      before(() => {
        request.body = {
          productId: '33333333333333',
          quantity: 2,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'createSales').resolves({ error: mockReturn });
      });

      after(() => salesService.createSales.restore());

      it('chama a função "salesService.createSales', async () => {
        await salesController.createSales(request, response, () => {});

        const itensSold = request.body;

        expect(salesService.createSales.calledWith(itensSold)).to.be.equal(true);
      });

      it('retorna status 404', async () => {
        await salesController.createSales(request, response, () => {});

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await salesController.createSales(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "getSales"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        _id: '222222222222222',
        itemSold: {
          productId: '33333333333333',
          quantity: 2,
        },
      };

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'getSales').resolves({ sales: mockReturn });
      });

      after(() => salesService.getSales.restore());

      it('chama a função "salesService.getSales', async () => {
        await salesController.getSales(request, response, () => {});

        expect(salesService.getSales.calledWith()).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await salesController.getSales(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna vendas', async () => {
        await salesController.createSales(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "getSalesById"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        _id: '222222222222222',
        itemSold: {
          productId: '33333333333333',
          quantity: 2,
        },
      };

      before(() => {
        request.params = {
          id: '222222222222222'
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'getSalesById').resolves({ sales: mockReturn });
      });

      after(() => salesService.getSalesById.restore());

      it('chama a função "salesService.getSalesById', async () => {
        await salesController.getSalesById(request, response, () => {});

        const { id } = request.params

        expect(salesService.getSalesById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await salesController.getSalesById(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna venda encontrada pelo ID', async () => {
        await salesController.getSalesById(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match({ sales: mockReturn }))).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };

      before(() => {
        request.params = {
          id: 0
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'getSalesById').resolves({ error: mockReturn });
      });

      after(() => salesService.getSalesById.restore());

      it('chama a função "salesService.getSalesById', async () => {
        await salesController.getSalesById(request, response, () => {});

        const { id } = request.params;

        expect(salesService.getSalesById.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 404', async () => {
        await salesController.getSalesById(request, response, () => {});

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await salesController.getSalesById(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "updateSale"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        _id: '222222222222222',
        itemSold: {
          productId: '33333333333333',
          quantity: 2,
        },
      };

      before(() => {
        request.params = {
          id: '222222222222222'
        };

        request.body = {
          itemSold: {
            productId: '33333333333333',
            quantity: 2,
          },
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'updateSale').resolves({ result: mockReturn });
      });

      after(() => salesService.updateSale.restore());

      it('chama a função "salesService.updateSale', async () => {
        await salesController.updateSale(request, response, () => {});

        const { id } = request.params;
        const itemSold = request.body;

        expect(salesService.updateSale.calledWith(id, itemSold)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await salesController.updateSale(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('atualiza a venda atualizada', async () => {
        await salesController.updateSale(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };

      before(() => {
        request.params = {
          id: 0
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'updateSale').resolves({ error: mockReturn });
      });

      after(() => salesService.updateSale.restore());

      it('chama a função "salesService.updateSale', async () => {
        await salesController.updateSale(request, response, () => {});

        const { id } = request.params;

        expect(salesService.updateSale.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await salesController.updateSale(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await salesController.updateSale(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });
  });

  describe('chamando a função "deleteSale"', () => {
    describe('com sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        _id: '222222222222222',
        itemSold: {
          productId: '33333333333333',
          quantity: 2,
        },
      };

      before(() => {
        request.params = {
          id: '222222222222222'
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'deleteSale').resolves({ result: mockReturn });
      });

      after(() => salesService.deleteSale.restore());

      it('chama a função "salesService.deleteSale', async () => {
        await salesController.deleteSale(request, response, () => {});

        const { id } = request.params;

        expect(salesService.deleteSale.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 200', async () => {
        await salesController.deleteSale(request, response, () => {});

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('atualiza a venda deletada', async () => {
        await salesController.deleteSale(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });

    describe('sem sucesso', () => {
      const request = {};
      const response = {};

      const mockReturn = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };

      before(() => {
        request.params = {
          id: 0
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);

        sinon.stub(salesService, 'deleteSale').resolves({ error: mockReturn });
      });

      after(() => salesService.deleteSale.restore());

      it('chama a função "salesService.deleteSale', async () => {
        await salesController.deleteSale(request, response, () => {});

        const { id } = request.params;

        expect(salesService.deleteSale.calledWith(id)).to.be.equal(true);
      });

      it('retorna status 422', async () => {
        await salesController.deleteSale(request, response, () => {});

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna mensagem de erro', async () => {
        await salesController.deleteSale(request, response, () => {});
        
        expect(response.json.calledWith(sinon.match(mockReturn))).to.be.equal(true);
      });
    });
  });
});
