const { expect } = require('chai');
const sinon = require('sinon');

const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');
const ProductsService = require('../../services/productsService');
const SalesService = require('../../services/salesService');

describe('', () => {
describe()

    before(() => {
        const ID_EXAMPLE = '604cb554311d68f491ba5781';
        const NAME_EXAMPLE = 'Biggus Dickus';
        const QTTY_EXAMPLE = 69;
        sinon.stub(ProductsModel, 'create')
        .resolves({ id: ID_EXAMPLE, name: NAME_EXAMPLE, quantity: QTTY_EXAMPLE });
    });

    after(()=> {
    ProductsModel.create.restore();
    });

});