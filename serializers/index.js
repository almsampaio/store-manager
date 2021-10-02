const serializers = {
  serializeSales: (sales) => sales.map(({ _id, sales: itensSold }) => ({ _id, itensSold })),
};

module.exports = serializers;