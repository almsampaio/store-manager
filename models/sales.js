// Solução enconntrado em parceria com Eduardo Costa - Turma 10-A
const connectionDb = require('./connection');

// const getAll = async () => {
//   const allSales = await connectionDb()
//     .then((db) => db.collection('sales').find({}).toArray());
//   return allSales;
// };

const inputSales = async (salesArray) => {
  const { ops: newSale} = await connectionDb()
    .then((db) => db.collection('sales')
      .insertOne(
        {
          itensSold: salesArray,
        },
      ));
  return newSale[0];
};

module.exports = {
  // getAll,
  inputSales,
};
