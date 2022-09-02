// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { request } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean
  message: string
  method: string
  secret?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  res.status(200).json({
    ok: true,
    message: 'todo bien',
    method: req.method || 'no hay metodo',
    secret: process.env.SECRET_KEY,
  })
}
