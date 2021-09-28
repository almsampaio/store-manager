const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModels = require('../../models/products');
const salesModels = require('../../models/sales')

describe('Testando Models products', () => {
    const dbProduct = new MongoMemoryServer();
    // let connectionMock;

    let id;
    let testProduct;

    before(async () => {
        const URLMock = await dbProduct.getUri();
        const connectionMock = await MongoClient
            .connect(URLMock, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((conn) => conn.db('DbTeste'));

        sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
    });

    after(() => mongoConnection.connection.restore());

    describe('chamando a função addProduct', () => {
        describe('Produto Cadastrado com sucesso', () => {
            const ProductTest = {
            name: 'product test',
            quantity: 10,
        };
            it('não possui produtos cadastrados', async () => {
            const result = await productModels.getAll();

            expect(result).to.be.deep.equal([]);
            });

        it('cadastra um produto com sucesso', async () => {
            const { name, quantity } = ProductTest;

            await productModels.addProduct(name, quantity);

            const result = await productModels.findName('product test');

        expect(result).to.deep.include.keys('_id', 'name', 'quantity');

            testProduct = result;
            id = ObjectId(result._id);
        });

        it('encontra o produto cadastrado', async () => {
            const result = await productModels.findName(ProductTest.name);
            const { name, quantity } = result;

        expect(name).to.be.equal(ProductTest.name);
        expect(quantity).to.be.equal(ProductTest.quantity);
            });
    });
    });

    describe('chamando a função findName', () => {
        describe('busca o produto pelo nome', () => {
            // it('retorna o produto correspondente', async () => {
            //     const result = await productModels.findName('name');

            //     expect(result).to.deep.include.keys('_id', 'name', 'quantity');
            //     expect(result).to.be.deep.equal(testProduct);
            // });

        it('retorna null caso o Id seja inválido', async () => {
            const result = await productModels.getById('1234');

        expect(result).to.be.null;
        });
        });
    });

    describe('chamando a função getAll', () => {
        describe('retorna todos os produtos cadastrados', async () => {
            const result = await productModels.getAll();

            expect(result).to.be.a('array');
        });
    });

    describe('chamando a função remove', () => {
        it('retorna null caso o Id seja inválido', async () => {
        const result = await productModels.remove('1234');

        expect(result).to.be.null;
        });

        it('produto não é deletado', async () => {
            const result = await productModels.getById(id);

        expect(result).to.be.deep.equal(testProduct);
        });
    })

    describe('chamando a função update', async () => {
        beforeEach(async () => {
        await productModels.addProduct('produto', 50);
        const result = await productModels.findName('produto');
        testProduct = result;
        id = ObjectId(result._id);
    });
    
    it('retorna null caso o Id seja inválido', async () => {
        const result = await productModels.update('1234');

        expect(result).to.be.null;
    });

    // it('retorna o objeto alterado com sucesso caso os dados sejam válidos', async () => {
    //     const result = await productModels.update(id, -20);

    //     const produtoAlterado = { _id: id, name: 'produto', quantity: 30 };

    //     expect(result).to.be.deep.equal(produtoAlterado);
    // });
    });
})


//Sales

describe('Testando Models sales', () => {
    const dbSales = new MongoMemoryServer();
    let connectionMock;

    let id;
    let testProduct;
    let testSale;

    before(async () => {
    const URLMock = await dbSales.getUri();
    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);

    const result = await productModels.addProduct('product test', 20);
    testProduct = result;
    console.log(testProduct);
});

after(() => mongoConnection.connection.restore());

describe('chamando a função addSales', () => {
    it('retorna a venda criada', async () => {
    const [result] = await salesModels.addSales(testProduct);

    expect(result).to.deep.include.keys('_id', 'itensSold');

    testSale = result;
    id = result._id;
    });
});
});