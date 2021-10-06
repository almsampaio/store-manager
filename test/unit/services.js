const { MongoClient, ObjectId } = require('mongodb');
const connection = require('../../models/connection');
const chai = require('chai');

const { expect } = chai;

const products = [
  { name: 'Martelo de Thor', quantity: 10 },
  { name: 'Traje de encolhimento', quantity: 20 },
  { name: 'Escudo do Capitão América', quantity: 30 },
];


const sales = [
  {
    productId: "615daeca6c74e53c32b3cce3",
    quantity: 12
  },
  {
    productId: "615daeca6c74e53c32b3cce4",
    quantity: 5
  },
  {
    productId: "615daeca6c74e53c32b3cce5",
    quantity: 95
  },
  {
    productId: "615daeca6c74e53c32b3cce6",
    quantity: 4
  },
  {
    productId: "615daeca6c74e53c32b3cce7",
    quantity: 23
  },
  {
    productId: "615daeca6c74e53c32b3cce8",
    quantity: 25
  }
]


const productService = require('../../services/productsService');
const salesService = require('../../services/salesService');

describe("Testes na camada Services", () => {
    beforeEach(async () => {
      const conn = await connection();
      const productsDB = await conn.collection('products');
      const salesDB = await conn.collection('sales');
      await productsDB.deleteMany({});
      await salesDB.deleteMany({});
      await productsDB.insertMany(products);
      await salesDB.insertOne({ itensSold: sales });
    })
    it (('Cria produto com sucesso'),async () => {
      const created = await productService.addNewProduct({ name: 'Joias do infinito' , quantity: 5 });
      const allProducts = await productService.getAllProducts();
      expect(created.name).to.be.equal('Joias do infinito');
      expect(created.quantity).to.be.equal(5);
      expect(allProducts
          .filter(({ name }) => name === created.name)).to.have.length.greaterThan(0);
    });
  
    it ('Retorna todos os produtos', async () => {
      const allProducts = await productService.getAllProducts();
      expect(allProducts).to.be.a('array');
      expect(allProducts).to.have.length(3);
      allProducts.forEach((prod, index) => {
        expect(prod).to.be.deep.equal(products[index]);
      })});
    it ('Retorna produto filtrado pelo id', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id } = allProducts[0];
      const sortedProduct = await productService.getById(_id);
      expect(sortedProduct.name).to.be.deep.equal(sortedProduct.name);
    });
    it ('Atualiza produto', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id, quantity } = allProducts[0];
      await productService.updateProduct(_id,{ name: 'meio machado, meio martelo', quantity });
      const allProductsReborn = await productService.getAllProducts();
      expect(allProductsReborn[0].name).to.be.deep.equal('meio machado, meio martelo');
    })
    it ('Deleta produto', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id } = allProducts[0];
      await productService.deleteProduct(_id);
      const allProductsReborn = await productService.getAllProducts();
      expect(allProductsReborn.filter(({ name }) => name === allProducts[0].name ))
      .to.not.have.length.greaterThan(0);
    })
    it ('Cria venda', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id, quantity } = allProducts[0];
      const newSale = await salesService.addNewSale({ _id, quantity });
      expect(newSale).to.have.a('object');
    });
    it ('Busca vendas', async () => {
      const sales = await salesService.getAllSales();
      console.log(sales);
      expect(typeof sales).to.be.deep.equal('object');
    })
    it ('Busca vendas pelo id', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id, quantity } = allProducts[0];
      await salesService.addNewSale({ productId: _id, quantity });
      const sales = await salesService.getSalesById(_id);
      console.log(sales);
    })
    it ('Atualiza a venda', async () => {
      const allProducts = await productService.getAllProducts();
      const { _id, quantity } = allProducts[0];
      const newSale = await salesService.addNewSale({ productId: _id, quantity });
      const { _id: id } = newSale;
      await salesService.updateSale(id,{ productId: _id, quantity: 3 });
      const sales = await salesService.getAllSales();
      expect(sales[0].itensSold.productId).to.be.deep.equal(_id);
    })
    it (' Deleta vendas', async () => {
      const sales = await salesService.getAllSales();
      const { _id } = sales[0];
      await salesService.deleteSale(_id);
      const salesReborn = await salesService.getAllSales();
      const { _id: id } = salesReborn[0];
      expect(id).to.not.be.equal(_id);
    })
  });