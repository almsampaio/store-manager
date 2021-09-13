const validateQuantitySales = (req, res, next) => {
    const results = req.body.map((elem) => {
        let result = true;
        if (
            typeof elem.quantity !== 'number'
           || elem.quantity < 0 || elem.quantity === 0) {
             result = false;
           }
           return result;
     });
     if (results.includes(false)) {
      return res.status(422)
     .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }); 
}
    
        next();
};

module.exports = { validateQuantitySales };