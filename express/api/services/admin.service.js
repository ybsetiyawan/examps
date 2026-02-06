const AdminRepo = require('../repositories/admin.repo');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('../utils/jwt');


class AdminService {
  static async register(payload) {
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      throw new Error('Data admin tidak lengkap');
    }

    const existing = await AdminRepo.getByEmail(email);
    if (existing) {
      throw new Error('Email sudah terdaftar');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await AdminRepo.create({
      id: uuidv4(),
      name,
      email,
      password_hash: passwordHash
    });

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email
    };
  }

  static async login(payload) {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Email dan password wajib diisi');
    }

    const admin = await AdminRepo.getByEmail(email);
    if (!admin) {
      throw new Error('Admin tidak ditemukan');
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      throw new Error('Password salah');
    }

    const token = jwt.sign({
    id: admin.id,
    email: admin.email,
    role: 'admin'
  });

   return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email
    }
  };
  }
}

module.exports = AdminService;
