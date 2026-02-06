const { v4: uuidv4 } = require('uuid');
const OptionRepo = require('../repositories/option.repo');

const OptionService = {
  create: async (questionId, payload) => {
    const { label, text, is_correct } = payload;

    if (!label || !text) {
      throw new Error('Label dan teks jawaban wajib diisi');
    }

    const option = {
      id: uuidv4(),
      question_id: questionId,
      label,
      text,
      is_correct: !!is_correct
    };

    return OptionRepo.create(option);
  }
};

module.exports = OptionService;
