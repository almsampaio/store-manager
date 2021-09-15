const salesService = require('../services/Sales');
const httpcodes = require('../lib/httpcodes');

module.exports = {
  async create(req, res) {
    try {
      const sales = await salesService.create(req.body);
      return res.status(200).json(sales);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },

  async get(req, res) {
    const { id } = req.params;
    try {
      const sales = await salesService.get(id);
      return res.status(200).json(sales);
    } catch (error) {
      let code = 422;
      if (error.message === 'Sale not found') code = 404;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const sale = await salesService.update(id, req.body);
      return res.status(200).json(sale);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      try {
        const sale = await salesService.get(id);
        await salesService.delete(id);
        return res.status(200).json(sale);
      } catch (error) {
        throw new Error('Wrong sale ID format');
      }
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },
};
