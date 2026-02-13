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

  
  getById: async (id) => {
    const employee = await EmployeeRepo.findById(id);
    if (!employee) {
      throw new Error('Karyawan tidak ditemukan');
    }
    return employee;
  },
  

  getAll: async () => {
    return EmployeeRepo.findAll();
  },

  getAllPaginatedSearch: async (page = 1, limit = 10, search = '') => {
  return await EmployeeRepo.findAllPaginatedSearch(page, limit, search);
},


  update: async (id, payload) => {
    if (!id) {
      throw new Error('employee id wajib diisi');
    }

    const existing = await EmployeeRepo.findById(id);
    if (!existing) {
      throw new Error('Karyawan tidak ditemukan');
    }

    // kalau NIK mau diubah, cek dulu jangan duplikat
    if (payload.nik && payload.nik !== existing.nik) {
      const dup = await EmployeeRepo.findByNik(payload.nik);
      if (dup) {
        throw new Error('NIK sudah digunakan karyawan lain');
      }
    }

    const updated = await EmployeeRepo.update(id, payload);
    if (!updated) {
      throw new Error('Gagal mengupdate karyawan');
    }

    return updated;
  },

  softDelete: async (id) => {
    if (!id) {
      throw new Error('employee id wajib diisi');
    }

    const existing = await EmployeeRepo.findById(id);
    if (!existing) {
      throw new Error('Karyawan tidak ditemukan');
    }

    const deleted = await EmployeeRepo.softDelete(id);
    if (!deleted) {
      throw new Error('Gagal menghapus karyawan');
    }

    return deleted;
  }


};

module.exports = EmployeeService;
