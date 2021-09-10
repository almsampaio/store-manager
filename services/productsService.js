const productsModel = require('../models/productsModel');
const InvalidDataError = require('../util/InvalidDataError');
const productSchema = require('../validation/products');

const extractErrorMessage = (validationError) => validationError.details[0].message;

exports.create = async ({ name, quantity }) => {
        const alreadyExists = await productsModel.findOne({ name });
        if (alreadyExists) throw new InvalidDataError('Product already exists');
        const { error } = productSchema.validate({ name, quantity });
        if (error) {
          throw new InvalidDataError(extractErrorMessage(error));
        }
        const { _doc: product } = await productsModel.create({ name, quantity });
        return product;
};
