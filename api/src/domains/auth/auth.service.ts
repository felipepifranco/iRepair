// src/domains/auth/auth.service.ts
import bcrypt from 'bcrypt'
import { prisma } from "@config/prismaClient"
import { generateToken } from '../../utils/token'
import { AppError } from '../../utils/AppError'  // classe de erro customizada

const SALT_ROUNDS = 10

export class AuthService {

  async register(email: string, senha: string) {
    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      throw new AppError('Email já cadastrado', 409)
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    const usuario = await prisma.user.create({
      data: { email, password: senhaHash },
      select: { id: true, email: true },  // nunca retorne o hash da senha
    })

    return usuario
  }

  async login(email: string, senha: string) {
    const usuario = await prisma.user.findUnique({
      where: { email },
    })

    if (!usuario) {
      // Mensagem genérica: não revele se o email existe ou não
      throw new AppError('Credenciais inválidas', 401)
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.password)

    if (!senhaCorreta) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const token = generateToken({ id: usuario.id, email: usuario.email })

    return { token, usuario: { id: usuario.id, email: usuario.email } }
  }
}