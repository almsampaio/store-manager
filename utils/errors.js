const shortName = {
  code: 'invalid_data',
  message: '"name" length must be at least 5 characters long',
  status: 422,
};

const productAlreadyExists = {
  status: 422,
  message: 'Product already exists',
  code: 'invalid_data',
};

const shortQuantity = {
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
  status: 422,
};

const quantityMustBeNumber = {
  code: 'invalid_data',
  message: '"quantity" must be a number',
  status: 422,
};

const wrongIdFormat = {
  code: 'invalid_data',
  message: 'Wrong id format',
  status: 422,
};
// const invalidEmail = {
//   status: 400,
//   message: '"email" must be a valid email',
// };

// const requiredEmail = {
//   message: '"email" is required',
//   status: 400,
// };

// const emptyEmail = {
//   message: '"email" is not allowed to be empty',
//   status: 400,
// };

// const shortPassword = {
//   message: '"password" length must be 6 characters long',
//   status: 400,
// };

// const requiredPassword = {
//   message: '"password" is required',
//   status: 400,
// };

// const emptyPassword = {
//   message: '"password" is not allowed to be empty',
//   status: 400,
// };

// const invalidFields = {
//   message: 'Invalid fields',
//   status: 400,
// };

// const tokenNotFound = {
//   message: 'Token not found',
//   status: 401,
// };

// const expiredOrInvalidToken = {
//   message: 'Expired or invalid token',
//   status: 401,
// };

// const userNotFound = {
//   message: 'User does not exist',
//   status: 404,
// };

// const CategoryIdNotFound = {
//   message: '"categoryIds" not found',
//   status: 400,
// };

// const requiredName = {
//   message: '"name" is required',
//   status: 400,
// };

// const requiredTitle = {
//   message: '"title" is required',
//   status: 400,
// };

// const requiredCategoryId = {
//   message: '"categoryIds" is required',
//   status: 400,
// };

// const requiredContent = {
//   message: '"content" is required',
//   status: 400,
// };

// const postNotFound = {
//   message: 'Post does not exist',
//   status: 404,
// };

module.exports = {
  shortName,
  productAlreadyExists,
  shortQuantity,
  quantityMustBeNumber,
  wrongIdFormat,
  // invalidEmail,
  // requiredEmail,
  // emailAlreadyRegistered,
  // emptyEmail,
  // shortPassword,
  // requiredPassword,
  // emptyPassword,
  // invalidFields,
  // tokenNotFound,
  // expiredOrInvalidToken,
  // userNotFound,
  // requiredName,
  // requiredTitle,
  // requiredCategoryId,
  // requiredContent,
  // CategoryIdNotFound,
  // postNotFound,
};