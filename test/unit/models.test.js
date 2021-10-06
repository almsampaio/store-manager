const { MongoClient } = require('mongodb');
const connection = require('../../model/connection');
const mockConn = require('./connection');
const sinon = require('sinon');
const chai = require('chai');

const productsModel = require('../../model/productsModel');

const { stub } = sinon;
const { expect } = chai;

const products = [
    { name: 'Martelo de Thor', quantity: 10 },
    { name: 'Traje de encolhimento', quantity: 20 },
    { name: 'Escudo do Capitão América', quantity: 30 },
  ];

describe("teste 1", () => {
  beforeEach(async () => {
    const conn = await connection();
    // sinon.stub(connection, 'db').resolves(mockConn);
    const productsDB = await conn.collection('products')
    const salesDB = await conn.collection('sales');
    await productsDB.deleteMany({});
    await salesDB.deleteMany({});
    await productsDB.insertMany(products);
  })
  it ('Retorna todos os produtos', async () => {
    const allProducts = await productsModel.getAllProducts();
    expect(allProducts).to.be.a('array');
    expect(allProducts).to.have.length(3);
    allProducts.forEach((prod, index) => {
      expect(prod).to.be.deep.equal(products[index]);
    })
  })
//     MongoClient.connect.restore();
//   })
});
