const checkName = (req, res, next) => {
    const { name } = req.body;
if (typeof name !== 'string') {
 return res.status(422).json({
    err: { code: 'invalid_data', message: '"name" must be string' },
});
} 
if (name.length <= 5) {
    return res.status(422).json({
        err: {
            code: 'ivalid_data', message: '"name" length must be at least 5 chacters long',
        },
    });
}
 next();
};

const checkProductQuantify = (req, res, next) => {
 const { quantify } = req.body;
 if (typeof quantify !== 'number') {
     return res.status(422).json({
         err: {
             code: 'invalid_data',
             message: '"quantity" must be a number',
         },
     });
 }
 if (quantify <= 0) {
     return res.status(422).json({
         err: {
             code: 'invalid_data',
             message: '"quantify" must be larger than or equal to 1',
         },
     });
 }
 next();
};

module.exports = { checkName, checkProductQuantify };
