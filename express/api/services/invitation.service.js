const InvitationRepo = require('../repositories/invitation.repo');
const EmployeeRepo = require('../repositories/employee.repo');
const { v4: uuidv4 } = require('uuid');


const InvitationService = {

  create: async ({ exam_id, employee_id, expired_at }) => {
    if (!exam_id || !employee_id) {
      throw new Error('exam_id dan employee_id wajib diisi');
    }

    const employee = await EmployeeRepo.findById(employee_id);
    if (!employee) {
      throw new Error('Karyawan tidak ditemukan');
    }

    const invitation = {
      id: uuidv4(),
      exam_id,
      employee_id,
      email: employee.email,
      token: uuidv4(),
      expired_at,
    };

    return await InvitationRepo.create(invitation);
  },

  validateToken: async (token) => {
    if (!token) {
      throw new Error('Token wajib diisi');
    }

    const invitation = await InvitationRepo.findByToken(token);
    if (!invitation) {
      throw new Error('Undangan tidak ditemukan');
    }

    if (invitation.status === 'completed') {
      throw new Error('Ujian sudah diselesaikan');
    }

    if (invitation.expired_at && new Date(invitation.expired_at) < new Date()) {
      throw new Error('Undangan sudah kadaluarsa');
    }

    return invitation;
  },
};

module.exports = InvitationService;
