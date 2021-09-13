// const { ObjectID } = require('bson');
// const connection = require('./connection');

const salesCrud = async (DBcollection, operation, payload) => {
  if (operation === 'addNew') { return payload; }
};

module.exports = {
  salesCrud,
};
