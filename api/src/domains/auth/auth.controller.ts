// src/domains/auth/auth.controller.ts
import { type Request, type Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {

  async register(req: Request, res: Response) {
    const { email, senha } = req.body
    const usuario = await authService.register(email, senha)
    return res.status(201).json(usuario)
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body
    const { token, usuario } = await authService.login(email, senha)

    // Setando o cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,     // JavaScript não consegue ler este cookie
      secure: false,      // true em produção (exige HTTPS)
      sameSite: 'lax',    // 'strict' em produção
      maxAge: 60 * 60 * 1000,  // 1 hora em milissegundos
    })

    return res.status(200).json({ usuario })
  }

  async logout(req: Request, res: Response) {
    // "Limpar" o cookie é setar um novo com maxAge: 0
    res.clearCookie('token')
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  // No AuthController:
  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }
}