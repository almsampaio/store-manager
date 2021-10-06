const { MongoClient, ObjectId } = require('mongodb');
const connection = require('../../model/connection');
const sinon = require('sinon');
const chai = require('chai');

const productsModel = require('../../model/productsModel');
const salesModel = require('../../model/salesModel');

const { stub } = sinon;
const { expect } = chai;

const products = [
    { name: 'Martelo de Thor', quantity: 10 },
    { name: 'Traje de encolhimento', quantity: 20 },
    { name: 'Escudo do Capitão América', quantity: 30 },
  ];

describe("Testes na camada Models", () => {
  beforeEach(async () => {
    const conn = await connection();
    // sinon.stub(connection, 'db').resolves(mockConn);
    const productsDB = await conn.collection('products')
    const salesDB = await conn.collection('sales');
    await productsDB.deleteMany({});
    await salesDB.deleteMany({});
    await productsDB.insertMany(products);
  })
  it (('Cria produto com sucesso'),async () => {
    const created = await productsModel.addNewProduct({ name: 'Joias do infinito' , quantity: 5 });
    const allProducts = await productsModel.getAllProducts();
    expect(created.name).to.be.equal('Joias do infinito');
    expect(created.quantity).to.be.equal(5);
    expect(allProducts
        .filter(({ name }) => name === created.name)).to.have.length.greaterThan(0);
  });

  it ('Retorna todos os produtos', async () => {
    const allProducts = await productsModel.getAllProducts();
    expect(allProducts).to.be.a('array');
    expect(allProducts).to.have.length(3);
    allProducts.forEach((prod, index) => {
      expect(prod).to.be.deep.equal(products[index]);
    })});
  it ('Retorna produto filtrado pelo id', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id } = allProducts[0];
    const sortedProduct = await productsModel.getById(_id);
    expect(sortedProduct.name).to.be.deep.equal(sortedProduct.name);
  });
  it ('Atualiza produto', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id, quantity } = allProducts[0];
    await productsModel.updateProduct(_id,{ name: 'meio machado, meio martelo', quantity });
    const allProductsReborn = await productsModel.getAllProducts();
    expect(allProductsReborn[0].name).to.be.deep.equal('meio machado, meio martelo');
  })
  it ('Deleta produto', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id } = allProducts[0];
    await productsModel.deleteProduct(_id);
    const allProductsReborn = await productsModel.getAllProducts();
    expect(allProductsReborn.filter(({ name }) => name === allProducts[0].name ))
    .to.not.have.length.greaterThan(0);
  })
  it ('Cria venda', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id, quantity } = allProducts[0];
    const newSale = await salesModel.addNewSale({ _id, quantity });
    expect(newSale).to.have.a('object');
  });
  it ('Busca vendas', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id, quantity } = allProducts[0];
    await salesModel.addNewSale({ productId: _id, quantity });
    const sales = await salesModel.getAllSales();
    expect(sales[0].productId).to.be.deep.equal(_id);
  })
  it ('Atualiza a venda', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id, quantity } = allProducts[0];
    const newSale = await salesModel.addNewSale({ productId: _id, quantity });
    const { _id: id } = newSale;
    await salesModel.updateSale(id,{ productId: _id, quantity: 3 });
    const sales = await salesModel.getAllSales();
    expect(sales[0].itensSold.productId).to.be.deep.equal(_id);
  })
  it (' Deleta vendas', async () => {
    const allProducts = await productsModel.getAllProducts();
    const { _id, quantity } = allProducts[0];
    const newSale = await salesModel.addNewSale({ productId: _id, quantity });
    const { _id: id } = newSale
    await salesModel.deleteSale(id);
    const sales = await salesModel.getAllSales();
    expect(sales).to.have.length(0);
  })
});
