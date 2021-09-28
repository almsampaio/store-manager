const validateInsertData = (req, res, next) => {
    const { name, quantity } = req.body;
    if (name.length < 5) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'name\' length must be at least 5 characters long',
     } });
    }
};