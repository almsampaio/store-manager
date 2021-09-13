const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModel = require('../../models/productModel');

const PRODUCTS_COLLECTION = 'products'

describe('create', () => {
    let db;
    const payloadProduct = {
      name: 'lixeira',
      quantity: 20
    };

      before(async () => {
        const DBServer = new MongoMemoryServer();
        const URLMock = await DBServer.getUri();

        db = await MongoClient
          .connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
          .then((conn) => conn.db('StoreManager'));


        sinon.stub(mongoConnection, 'getConnection').resolves(db);

        await db.collection(PRODUCTS_COLLECTION).insertOne(payloadProduct);
      });

    after(async () => {
      mongoConnection.getConnection.restore();
      // await db.collection(PRODUCTS_COLLECTION).deleteMany({});
    });

    describe('when you try to insert an existing product', () => {
      // beforeEach(async () => {
      //   await db.collection(PRODUCTS_COLLECTION).deleteMany({})
      //   await db.collection(PRODUCTS_COLLECTION).insertOne(payloadProduct);
      // })

      it('return a null', async () => {
        const response = await productModel.create(payloadProduct);
        console.log(response);
        expect(response).to.be.equal(null);
      });



    });

  });



















// describe('create product', () => {
//   let db;
//   before(async () => {
//     const mongoServer = new MongoMemoryServer();
//     const URLMock = await mongoServer.getUri();
//     db = await MongoClient
//       .connect(URLMock, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       })
//       .then((conn) => conn.db('StoreManager'));

//     sinon.stub(mongoConnection, 'getConnection').resolves(db);
//   });

//   after(async () => {
//     mongoConnection.getConnection.restore();
//       if (db) {
//         await db.close();
//       }
//       if (mongoServer) {
//         await mongoServer.stop();
//       }
//   });

//   describe('tests when you try to insert an existing product', () => {
//     const product = {
//       name: "computer",
//       quantity: 40
//     }

//     before(async () => {
//       await db.collection(PRODUCTS_COLLECTION).deleteMany({});
//       const ok1 = await db.collection(PRODUCTS_COLLECTION).find({}).toArray();
//       console.log(ok1)
//       await db.collection(PRODUCTS_COLLECTION).insertOne(product);
//       const ok2 = await db.collection(PRODUCTS_COLLECTION).find({}).toArray();
//       console.log(ok2);
//     });

//     it('expect the return to be null', async () => {
//       const result = await productModel.create(product);
//       expect(result).to.be.equal(null);
//     });
//   });

// });







// ----------------------------------------------------- || ----------------------------------------------------- //
