// funções generateToken e verifyToken
import jwt from 'jsonwebtoken'

const JWT_EXPIRES_IN = '1h'

interface TokenPayload {
  id: number    // mesmo campo do model User gerado pelo Prisma
  email: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN, // ex: '1h', '7d', '15m'
  })
}

interface DecodedTokenPayload {
  id: number
  email: string
  iat: number
  exp: number
}

export function verifyToken(token: string): TokenPayload {
  // jwt.verify lança uma exceção se o token for inválido ou expirado
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
  return decoded
}