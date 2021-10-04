const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/products');
const productsService = require('../../services/products');
const salesController = require('../../controllers/sales');
const salesService = require('../../services/sales');
const { addSales } = require('../../models/sales');

describe('Ao chamar o controller de products', () => {
    describe('chamando a função "getAll"', () => {
    const req = {};
    const res = {};

    const mockReturn = {
        products: [{
        _id: '12313213123123131332131',
        name: 'produto teste',
        quantity: 10,
        }],
    };
    before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').resolves(mockReturn);
    });

    after(() => productsService.getAll.restore());

    it('retorna produto', async () => {
    await productsController.getAll(req, res, () => {});

    expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

    });
})

describe('chamando a função "addProduct"', () => {
    describe('com sucesso', () => {
    const req = {};
    const res = {};

    const mockReturn = {
    products: {
        _id: '12313213123123131332131',
        name: 'produto teste',
        quantity: 10,
    },
    };

    before(() => {
    req.body = {
        name: 'produto teste',
        quantity: 10
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'addProduct').resolves(mockReturn);
    });

    after(() => productsService.addProduct.restore());

    it('chama a função "productsService.addProduct', async () => {
    await productsController.addProduct(req, res, () => {});

    const { name, quantity } = req.body;

    expect(productsService.addProduct.calledWith(name, quantity)).to.be.equal(true);
    });
    
})
})

describe('sem sucesso', () => {
    const req = {};
    const res = {};

    const mockReturn = { message: '"quantity" must be larger than or equal to 1' };

    before(() => {
        req.body = {
        name: 'produto teste',
        quantity: 10
        }

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'addProduct').resolves(mockReturn);
    });

    after(() => productsService.addProduct.restore());

    it('chama a função "productsService.addProduct', async () => {
        await productsController.addProduct(req, res, () => {});

        const { name, quantity } = req.body;

        expect(productsService.addProduct.calledWith(name, quantity)).to.be.equal(true);
    });
    it('retorna mensagem de erro', async () => {
        await productsController.addProduct(req, res, () => {});

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
})

describe('chamando a função "getById"', () => {
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

        sinon.stub(productsService, 'getById').resolves(mockReturn);
        });

        after(() => productsService.getById.restore());

            it('chama a função "productsService.getById', async () => {
            await productsController.getById(request, response, () => {});

            const { id } = request.params;

            expect(productsService.getById.calledWith(id)).to.be.equal(true);
            });
    });
})

describe('chamando a função "remove"', () => {
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

        sinon.stub(productsService, 'remove').resolves(mockReturn);
        });

        after(() => productsService.remove.restore());

        it('chama a função "productsService.remove', async () => {
        await productsController.remove(request, response, () => {});

        const { id } = request.params;

        expect(productsService.remove.calledWith(id)).to.be.equal(true);
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

        sinon.stub(productsService, 'remove').resolves(mockReturn);
        });

        after(() => productsService.remove.restore());

        it('chama a função "productsService.remove', async () => {
        await productsController.remove(request, response, () => {});

        const { id } = request.params;

        expect(productsService.remove.calledWith(id)).to.be.equal(true);
        });

        it('retorna mensagem de erro', async () => {
        await productsController.remove(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });
});
    

//sales

describe('Ao chamar o controller de sales', () => {
    describe('chamando a função "addSales"', () => {
    describe('com sucesso', () => {
    const request = {};
    const response = {};

    const mockReturn = {
        _id: '222222222222222222222222',
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

        sinon.stub(salesService, 'addSales').resolves({ result: mockReturn });
    });
    after(() => salesService.addSales.restore());

    it('chama a função "salesService.addSales', async () => {
        await salesController.addSales(request, response, () => {});

        const itensSold = request.body;

        expect(salesService.addSales.calledWith(itensSold)).to.be.equal(true);
    });
    })
})
})
describe('chamando a função "getAllSales"', () => {
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

        sinon.stub(salesService, 'getAllSales').resolves({ sales: mockReturn });
        });

        after(() => salesService.getAllSales.restore());

        it('chama a função "salesService.getAllSales', async () => {
        await salesController.getAllSales(request, response, () => {});

        expect(salesService.getAllSales.calledWith()).to.be.equal(true);
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
});
})
describe('chamando a função "updateSales"', () => {
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

    sinon.stub(salesService, 'updateSales').resolves({ result: mockReturn });
    });

    after(() => salesService.updateSales.restore());

    it('chama a função "salesService.updateSales', async () => {
    await salesController.updateSales(request, response, () => {});

    const { id } = request.params;
    const itemSold = request.body;

    expect(salesService.updateSales.calledWith(id, itemSold)).to.be.equal(true);
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

    sinon.stub(salesService, 'updateSales').resolves({ error: mockReturn });
    });

    after(() => salesService.updateSales.restore());

    it('chama a função "salesService.updateSales', async () => {
    await salesController.updateSales(request, response, () => {});

    const { id } = request.params;

    expect(salesService.updateSales.calledWith(id)).to.be.equal(true);
    });

});
});

describe('chamando a função "removeSales"', () => {
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

        sinon.stub(salesService, 'removeSales').resolves({ result: mockReturn });
        });

        after(() => salesService.removeSales.restore());

        it('chama a função "removeSales"', async () => {
        await salesController.removeSales(request, response, () => {});

        const { id } = request.params;

        expect(salesService.removeSales.calledWith(id)).to.be.equal(true);
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

        sinon.stub(salesService, 'removeSales').resolves({ error: mockReturn });
        });

        after(() => salesService.removeSales.restore());

    });
    })
})
