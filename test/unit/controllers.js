const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = {
  create: () => {}
}

describe('Ao chamar o controller de create sem passar nenhum valor', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    it('Status com o código 422', async () => {
      await ProductsController.create(req, res);

      expect(response.status.calledWith(422).to.be.equal(true))
    });
    it('é chamado o json com a mensagem "err" correto', async () => {
      await ProductsController.create(req,res);

      expect(response.json.calledWith({ err: { code: 'invalid_data',
      message: '"quantity" must be a integer number' } })).to.be.equal(true);
    })
  })
});

describe('Ao chamar o controller de create com name nao tendo caracteres necessarios', () => {
  const response = {};
  const request = {};
  before(() => {
    request.body = {
      name: '12345',
      quantity: 10,
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  it('Status deve ser 422', async () => {
    await ProductsController.create(req, res);

    expect(response.status.calledWith(422).to.be.equal(true))
  });

  it('Json deve ser erro correto', async () => {
    await ProductsController.create(req, res);

    expect(response.json.calledWith({ err: { code: 'invalid_data',
    message: '"name" must be at least 5 characters long' } })).to.be.equal(true);
  });
});

describe('Ao chamar o controller de create com name nao sendo string', () => {
  const response = {};
  const request = {};
  before(() => {
    request.body = {
      name: 123456789,
      quantity: 10,
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  it('Status deve ser 422', async () => {
    await ProductsController.create(req, res);

    expect(response.status.calledWith(422).to.be.equal(true))
  });

  it('Json deve ser erro correto', async () => {
    await ProductsController.create(req, res);

    expect(response.json.calledWith({ err: { code: 'invalid_data',
    message: '"name"  must be a string' } })).to.be.equal(true);
  });
});

describe('Se o produto ja existe ??????????????', {

})

describe('Se a quantidade nao for um numero inteiro', () => {
  before(() => {
    request.body = {
      name: '123456789',
      quantity: 1.2,
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  it('Status deve ser 422', async () => {
    await ProductsController.create(req, res);

    expect(response.status.calledWith(422).to.be.equal(true))
  });

  it('Json deve ser erro correto', async () => {
    await ProductsController.create(req, res);

    expect(response.json.calledWith({ err: { code: 'invalid_data',
    message: '"quantity" must be a  integer number' } })).to.be.equal(true);
  });
});

describe('Se a quantidade for um numero menor que 1', () => {
  before(() => {
    request.body = {
      name: '123456789',
      quantity: 0,
    };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  it('Status deve ser 422', async () => {
    await ProductsController.create(req, res);

    expect(response.status.calledWith(422).to.be.equal(true))
  });

  it('Json deve ser erro correto', async () => {
    await ProductsController.create(req, res);

    expect(response.json.calledWith({ err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } })).to.be.equal(true);
  });
});