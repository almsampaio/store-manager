const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModels = require('../../models/products');
const salesModels = require('../../models/sales');

describe('Ao chamar os models de products', () => {
const DBServer = new MongoMemoryServer();
let connectionMock;

let id;
let testProduct;

before(async () => {
const URLMock = await DBServer.getUri();
connectionMock = await MongoClient
    .connect(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
});

after(() => mongoConnection.connection.restore());

    describe('chamando a função "addProduct"', () => {
        describe('com sucesso', () => {
            const mockProduct = {
            name: 'product test',
            quantity: 10,
            };

            it('não possui produtos cadastrados', async () => {
            const result = await productModels.getAll();

            expect(result).to.be.deep.equal([]);
            });

            it('cadastra um produto com sucesso', async () => {
            const { name, quantity } = mockProduct;

            await productModels.addProduct(name, quantity);

            const result = await productModels.findName('product test');

            expect(result).to.deep.include.keys('_id', 'name', 'quantity');

            testProduct = result;
            id = ObjectId(result._id);
            });

            it('encontra o produto cadastrado', async () => {
            const result = await productModels.findName(mockProduct.name);
            const { name, quantity } = result;
            
            expect(name).to.be.equal(mockProduct.name);
            expect(quantity).to.be.equal(mockProduct.quantity);
            });
        });
        });

        describe('chamando a função "getById"', () => {
        describe('busca o produto pelo Id', () => {
            it('retorna o produto correspondente', async () => {
            const result = await productModels.getById(id);

            expect(result).to.deep.include.keys('_id', 'name', 'quantity');
            expect(result).to.be.deep.equal(testProduct);
            });

            it('retorna null caso o Id seja inválido', async () => {
            const result = await productModels.getById('1234');

            expect(result).to.be.null;
            });
        });
        });

        describe('chamando a função "getAll"', () => {
        it('retorna todos os produtos cadastrados', async () => {
            const result = await productModels.getAll();

            expect(result).to.be.deep.equal([testProduct]);
        });
        });

        describe('chamando a função "update"', () => {
        it('retorna null caso o Id seja inválido', async () => {
            const result = await productModels.update('1234', 'falha ao alterar', 20);

            expect(result).to.be.null;
        });

        it('o produto não é alterado', async () => {
            const result = await productModels.getById(id);

            expect(result).to.be.deep.equal(testProduct);
        });

        it('altera o produto passando dados válidos', async () => {
            const result = await productModels.update(id, 'produto alterado', 50);

            const produtoAlterado = { _id: id, name: 'produto alterado', quantity: 50 };
            console.log(produtoAlterado);

            expect(result).to.be.deep.equal(produtoAlterado);

            testProduct = produtoAlterado;
        });
        });

        describe('chamando a função "remove"', () => {
        it('retorna null caso o Id seja inválido', async () => {
            const result = await productModels.remove('1234');

            expect(result).to.be.null;
        });

        it('produto não é deletado', async () => {
            const result = await productModels.getById(id);

            expect(result).to.be.deep.equal(testProduct);
        });

        it('deleta o produto ao passar um Id válido e retorna os dados excluídos', async () => {
            const result = await productModels.remove(id);

            expect(result).to.be.deep.equal(testProduct);
        });

        it('o produto não existe mais no banco', async () => {
            const result = await productModels.getById(id);

            expect(result).to.be.null;
        });
        });
})

// Sales

describe('Ao chamar os models de sales', () => {
    const DBServer = new MongoMemoryServer();
    let connectionMock;

    let id;
    let testProduct;
    let testSale;

    before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient
        .connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((conn) => conn.db('StoreManager'));

        sinon.stub(mongoConnection, 'connection').resolves(connectionMock);

        const result = await productModels.addProduct('product test', 20);
        testProduct = result;
    });

    after(() => mongoConnection.connection.restore());

    describe('chamando a função "addSales"', () => {
        it('retorna a venda criada', async () => {
        const result = await salesModels.addSales(testProduct);

        expect(result).to.deep.include.keys('_id', 'itensSold');

        testSale = result;
        id = result._id;
        });
    });

    describe('chamando a função "getAllSales"', () => {
        it('retorna todas as vendas cadastradas', async () => {
        const result = await salesModels.getAllSales();

        expect(result).to.be.deep.equal([testSale]);
        });
    });

    describe('chamando a função "getSalesById"', () => {
        it('caso o Id seja inválido, retorna null', async () => {
        const result = await salesModels.getSalesById('1234');

        expect(result).to.be.null;
        });

        it('retorna a venda correspondente ao Id', async () => {
        const result = await salesModels.getSalesById(id);

        expect(result).to.be.deep.equal(testSale);
        });
    });

    describe('chamando a função "updateSales"', () => {
        let updatedProduct;

        it('caso o Id seja inválido, retorna null', async () => {
        const result = await salesModels.updateSales('1234');

        expect(result).to.be.null;
        });

        it('atualiza a venda com sucesso', async () => {
        updatedProduct = await productModels.addProduct('produto alterado', 50);

        const result = await salesModels.updateSales(id, updatedProduct);
        
        expect(result).to.be.deep.equal({ _id: id, itensSold: updatedProduct });
        });

        it('confirma que o produto está atualizado no banco de dados', async () => {
        const result = await salesModels.getSalesById(id);

        expect(result).to.be.deep.equal({ _id: id, itensSold: updatedProduct });

        testSale = { _id: id, itensSold: updatedProduct };
        });
    });

    describe('chamando a função "removeSales"', () => {
        it('caso o id seja inválido, retorna null', async () => {
        const result = await salesModels.removeSales('1234');

        expect(result).to.be.null;
        });

        it('retorna a venda deletada', async () => {
        const result = await salesModels.removeSales(id);

        expect(result).to.be.deep.equal(testSale);
        });
    });
});
