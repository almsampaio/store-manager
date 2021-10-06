// const { MongoClient } = require('mongodb');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// const OUTPUT = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   const connect = async () => {
//       const DBServer = new MongoMemoryServer();
//     const URLMOCK = await DBServer.getUri();
//     return MongoClient.connect(URLMOCK, OUTPUT).then((conn) => conn.db('StoreManager'))
// };

// module.exports = connect;