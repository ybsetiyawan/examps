const OptionService = require('../services/option.service');

class OptionController {
  static async create(req, res) {
    try {
      const { questionId } = req.params;
      const option = await OptionService.create(questionId, req.body);

      return res.status(201).json({
        success: true,
        data: option
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = OptionController;
