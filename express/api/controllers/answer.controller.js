// const AnswerService = require('../services/answer.service');

// const AnswerController = {
//   submit: async (req, res, next) => {
//     try {
//       const { attempt_id, question_id, selected_option_id } = req.body;

//       const answer = await AnswerService.submit({
//         attempt_id,
//         question_id,
//         selected_option_id,
//       });

//       res.status(201).json({
//         success: true,
//         data: answer,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
// };

// module.exports = AnswerController;


const AnswerService = require('../services/answer.service');

const AnswerController = {
  submit: async (req, res, next) => {
    try {
      const invitation = req.invitation; // dari participantAuth

      const answer = await AnswerService.submit(invitation, {
        question_id: req.body.question_id,
        selected_option_id: req.body.selected_option_id,
      });

      res.status(201).json({
        success: true,
        data: answer,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AnswerController;
