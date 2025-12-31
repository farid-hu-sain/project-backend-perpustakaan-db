import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/response'
import config from "../utils/env"

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) errorResponse(res, "token tidak ditemukan", 401)

    const token = authHeader?.split(" ")[1]

    try {
        const payload = jwt.verify(token!, config.JWT_SECRET) as { id : number ; role: string }

        req.user = payload
        next()
    } catch (error){
        errorResponse (res, "token tidak valid", 401)
    }
}


export const memberOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'MEMBER') {
    return res.status(403).json({ error: 'Member only' })
  }
  next()
}


export const AdminOnly = (req: Request, res: Response, next: NextFunction) => {
if (req.user?.role === 'ADMIN' ) {
      return next()
    }
    
    return res.status(403).json({ error: 'Access denied' })
}
