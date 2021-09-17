const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModels = require('../../models/products');

describe('Ao chamar os models de products', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  let id;
  let testProduct;

  beforeEach(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db('StoreManager'));

      sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  afterEach(() => mongoConnection.connection.restore());

  describe('chamando a função "createProduct"', () => {
    describe('com sucesso', () => {
        const mockProduct = {
        name: 'product test',
        quantity: 10,
      };

      it('não possui produtos cadastrados', async () => {
        const result = await productModels.getProducts();

        expect(result).to.be.deep.equal([]);
      });

      it('cadastra um produto com sucesso', async () => {
        const { name, quantity } = mockProduct;

        await productModels.createProduct(name, quantity);

        const result = await productModels.getProductByName('product test');

        expect(result).to.deep.include.keys('_id', 'name', 'quantity');

        testProduct = result;
        id = ObjectId(result._id);
      });

      it('encontra o produto cadastrado', async () => {
        const result = await productModels.getProductByName(mockProduct.name);
        const { name, quantity } = result;
        
        expect(name).to.be.equal(mockProduct.name);
        expect(quantity).to.be.equal(mockProduct.quantity);
      });
    });
  });

  describe('chamando a função "getProductByName"', () => {
    describe('busca o produto pelo Id', () => {
      it('retorna o produto correspondente', async () => {
        const result = await productModels.getProductById(id);

        expect(result).to.deep.include.keys('_id', 'name', 'quantity');
        expect(result).to.be.deep.equal(testProduct);
      });

      it('retorna null caso o Id seja inválido', async () => {
        const result = await productModels.getProductById('1234');

        expect(result).to.be.null;
      });
    });
  });

  describe('chamando a função "getProducts"', () => {
    it('retorna todos os produtos cadastrados', async () => {
      const result = await productModels.getProducts();

      expect(result).to.be.deep.equal([testProduct]);
    });
  });

  describe('chamando a função "updateProduct"', () => {
    it('retorna null caso o Id seja inválido', async () => {
      const result = await productModels.updateProduct('1234', 'falha ao alterar', 20);

      expect(result).to.be.null;
    });

    it('o produto não é alterado', async () => {
      const result = await productModels.getProductById(id);

      expect(result).to.be.deep.equal(testProduct);
    });

    it('altera o produto passando dados válidos', async () => {
      const result = await productModels.updateProduct(id, 'produto alterado', 50);

      const produtoAlterado = { _id: id, name: 'produto alterado', quantity: 50 };

      expect(result).to.be.deep.equal(produtoAlterado);

      testProduct = produtoAlterado;
    });
  });

  describe('chamando a função "deleteById"', () => {
    it('retorna null caso o Id seja inválido', async () => {
      const result = await productModels.deleteById('1234');

      expect(result).to.be.null;
    });

    it('produto não é deletado', async () => {
      const result = await productModels.getProductById(id);

      expect(result).to.be.deep.equal(testProduct);
    });

    it('deleta o produto ao passar um Id válido e retorna os dados excluídos', async () => {
      const result = await productModels.deleteById(id);

      expect(result).to.be.deep.equal(testProduct);
    });

    it('o produto não existe mais no banco', async () => {
      const result = await productModels.getProductById(id);

      expect(result).to.be.null;
    });
  });

  describe('chamando a função "updateSoldProduct"', async () => {
    beforeEach(async () => {
      await productModels.createProduct('produto', 50);
      const result = await productModels.getProductByName('produto');
      testProduct = result;
      id = ObjectId(result._id);
    });
    
    it('retorna null caso o Id seja inválido', async () => {
      const result = await productModels.updateSoldProduct('1234');

      expect(result).to.be.null;
    });

    it('retorna o objeto alterado com sucesso caso os dados sejam válidos', async () => {
      const result = await productModels.updateSoldProduct(id, -20);

      const produtoAlterado = { _id: id, name: 'produto', quantity: 30 };


      expect(result).to.be.deep.equal(produtoAlterado);
    });
  });
});
