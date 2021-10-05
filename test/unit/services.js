const sinon = require('sinon');
const { expect } = require('chai');

const modelLayerP = require('../../models/products');
const modelLayerS = require('../../models/sales');
const servicesLayerP = require('../../services/products');
const servicesLayerS = require('../../services/sales');

describe('Test url create "products"', () => {
  describe('result of create products', async () => {
    const fakeProduct = { name: 'Im a fake product', quantity: 10 };
    const anotherProduct = { name: 'Im another product', quantity: 10 };

    before(() => {
      const _id = '610007e7604ebb2c6bf20454';
      sinon.stub(modelLayerP, 'create').resolves({ _id });
    });

    after(() => {
      modelLayerP.create.restore();
    });

    it('must have to be an object', async () => servicesLayerP.create(fakeProduct)
      .then((res) => expect(res).to.be.an('object')));

    it('must have props "data"', async () => servicesLayerP.create(anotherProduct)
      .then((res) => expect(res).to.have.a.property('data')));
  });
});

describe('test URL getAll "products"', () => {
  describe('no data on DB', () => {
    before(() => {
      sinon.stub(modelLayerP, 'getAll').resolves([]);
    });

    after(() => {
      modelLayerP.getAll.restore();
    });

    it('must have to an array', () => servicesLayerP.getAll()
      .then(({ data }) => expect(data).to.be.an('array')));

    it('array is empty', () => servicesLayerP.getAll()
      .then(({ data }) => expect(data).to.be.empty));
  });

  describe('db with data', () => {
    before(() => {
      sinon.stub(modelLayerP, 'getAll').resolves({ products: [
        { _id: '610007e7604ebb2c6bf20454', name: 'Im a fake product', quantity: 10 },
        { _id: '610007e7604ebb2c6bf20454', name: 'Im another product', quantity: 10 }
      ]});
    });

    after(() => {
      modelLayerP.getAll.restore();
    });

    it('must have to be an array', () => servicesLayerP.getAll()
      .then(({ data: { products } }) => expect(products).to.be.an('array')));

    it('array is not empty', () => servicesLayerP.getAll()
      .then(({ data: { products } }) => expect(products).to.not.be.empty));

    it('must have to be an object', () => servicesLayerP.getAll()
      .then(({ data: { products: [item] } }) => expect(item).to.be.an('object')));

    it('object must have props: id, name, quantity', async () => servicesLayerP.getAll()
      .then(({ data: { products: [item] } }) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Test url getByID "products"', () => {
  describe('no data on DB', () => {
    before(() => {
      sinon.stub(modelLayerP, 'getById').resolves(null);
    });

    after(() => {
      modelLayerP.getById.restore();
    });

    it('returns null', () => servicesLayerP.getById()
      .then(({ data }) => expect(data).to.be.null));
  });

  describe('db with data', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const product = { _id: _id, name: 'Im a fake product', quantity: 10 }
    before(() => {
      sinon.stub(modelLayerP, 'getById').resolves(product);
    });

    after(() => {
      modelLayerP.getById.restore();
    });

    it('must have to be an object', () => servicesLayerP.getById(_id)
      .then(({ data }) => expect(data).to.be.an('object')));

    it('object must have props: id, name, quantity', () => servicesLayerP.getById(_id)
      .then(({ data }) => expect(data).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Test url update "products"', () => {
  describe('result of update product', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const product = { name: 'Im a fake product', quantity: 10 };
    const newProduct = { name: 'Im a fake product', quantity: 7 };

    before(() => {
      sinon.stub(modelLayerP, 'update').resolves({ _id, product });
    });

    after(() => {
      modelLayerP.update.restore();
    });

    it('must have to be an object', () => servicesLayerP.update(_id, product)
        .then(({ data }) => expect(data).to.be.an('object')));

    it('must have props "id"', () => servicesLayerP.update(_id, newProduct)
        .then(({ data }) => expect(data).to.have.a.property('_id')));
  });
});

describe('Test url remove "products"', () => {
  describe('result of remove', () => {
    const _id = '610007e7604ebb2c6bf20454';

    before(() => {
      sinon.stub(modelLayerP, 'remove').resolves({ id: _id });
    });

    after(() => {
      modelLayerP.remove.restore();
    });

    it('product must have to result null', () => servicesLayerP.remove(_id)
        .then(() => servicesLayerP.getById(_id)
        .then(({ data }) => expect(data).to.be.null)));
  });
});

describe('Test url create "sales"', () => {
  describe('result of create', async () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];

    before(() => {
      sinon.stub(modelLayerS, 'create').resolves({ _id, itensSold });
    });

    after(() => {
      modelLayerS.create.restore();
    });

    it('must have to be an object', async () => servicesLayerS.create(itensSold)
      .then((res) => expect(res).to.be.an('object')));

    it('object must have props: "data"', async () => servicesLayerS.create(itensSold)
      .then((res) => expect(res).to.have.a.property('data')));
  });
});

describe('Test url getAll "sales"', () => {
  describe('no data on DB', () => {
    before(() => {
      sinon.stub(modelLayerS, 'getAll').resolves([]);
    });

    after(() => {
      modelLayerS.getAll.restore();
    });

    it('must have to be an array', () => servicesLayerS.getAll()
      .then(({ data }) => expect(data).to.be.an('array')));

    it('array is empty', () => servicesLayerS.getAll()
      .then(({ data }) => expect(data).to.be.empty));
  });

  describe('db with data', () => {
    before(() => {
      sinon.stub(modelLayerS, 'getAll').resolves({ sales: [
        { _id: '610007e7604ebb2c6bf20454', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }] },
        { _id: '610007e7604ebb2c6bf20454', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }] }
      ]});
    });

    after(() => {
      modelLayerS.getAll.restore();
    });

    it('must have to be an array', () => servicesLayerS.getAll()
      .then(({ data: { sales } }) => expect(sales).to.be.an('array')));

    it('array with data', () => servicesLayerS.getAll()
      .then(({ data: { sales } }) => expect(sales).to.not.be.empty));

    it('must have to be an object', () => servicesLayerS.getAll()
      .then(({ data: { sales: [item] } }) => expect(item).to.be.an('object')));

    it('object musta have props: id, itensSold', async () => servicesLayerS.getAll()
      .then(({ data: { sales: [item] } }) => expect(item).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Test url getById "sales"', () => {
  describe('no data on db', () => {
    before(() => {
      sinon.stub(modelLayerS, 'getById').resolves(null);
    });

    after(() => {
      modelLayerS.getById.restore();
    });

    it('returns null', () => servicesLayerS.getById()
      .then(({ data }) => expect(data).to.be.null));
  });

  describe('db with data', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
    before(() => {
      sinon.stub(modelLayerS, 'getById').resolves(itensSold);
    });

    after(() => {
      modelLayerS.getById.restore();
    });

    it('must have to be an object', () => servicesLayerS.getById(_id)
      .then(({ data: [item] }) => expect(item).to.be.an('object')));

    it('object must have props: productId, quantity', () => servicesLayerS.getById(_id)
      .then(({ data: [item] }) => expect(item).to.include.all.keys('productId', 'quantity')));
  });
});

describe('Test url update "sales"', () => {
  describe('result of update', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
    const newItens = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }];

    before(() => {
      const ID_EXAMPLE = '610007e7604ebb2c6bf20454';
      sinon.stub(modelLayerS, 'update').resolves({ _id, itensSold });
    });

    after(() => {
      modelLayerS.update.restore();
    });

    it('must have to be an object', () => servicesLayerS.update(_id, itensSold)
        .then(({ data }) => expect(data).to.be.an('object')));

    it('object must have props: id', () => servicesLayerS.update(_id, newItens)
        .then(({ data }) => expect(data).to.have.a.property('_id')));
  });
});

describe('Test url remove "sales"', () => {
  describe('result of remove', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

    before(() => {
      sinon.stub(modelLayerS, 'remove').resolves({ _id, itensSold });
    });

    after(() => {
      modelLayerS.remove.restore();
    });

    it('result must have to be null', () => servicesLayerS.remove(_id)
        .then(() => servicesLayerS.getById(_id)
        .then(({ data }) => expect(data).to.be.null)));
  });
});
