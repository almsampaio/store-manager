const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/products');
const productsService = require('../../services/products');

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

        it('retorna status 200', async () => {
        await productsController.getById(request, response, () => {});
            
        expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna produto encontrado', async () => {
        await productsController.getById(request, response, () => {});

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });
})