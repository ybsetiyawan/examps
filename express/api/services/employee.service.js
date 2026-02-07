const { v4: uuidv4 } = require('uuid');
const EmployeeRepo = require('../repositories/employee.repo');

const EmployeeService = {
  create: async (payload) => {
    const { nik, name, spcd, spname, email } = payload;

    if (!nik || !name || !spcd || !spname) {
      throw new Error('Data karyawan tidak lengkap');
    }

    const existing = await EmployeeRepo.findByNik(nik);
    if (existing) {
      throw new Error('NIK sudah terdaftar');
    }

    const employee = {
      id: uuidv4(),
      nik,
      name,
      spcd,
      spname,
      email
    };

    return EmployeeRepo.create(employee);
  },

  getByNik: async (nik) => {
    const employee = await EmployeeRepo.findByNik(nik);
    if (!employee) {
      throw new Error('Karyawan tidak ditemukan');
    }
    return employee;
  },

  getAll: async () => {
    return EmployeeRepo.findAll();
  }
};

module.exports = EmployeeService;
