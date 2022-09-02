import type { NextApiRequest, NextApiResponse } from 'next'
import { detectContentType } from 'next/dist/server/image-optimizer'
import { db } from '../../database'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(400).json({ message: 'No tiene acceso a este servicio' })
    }

    await db.connect();

    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}