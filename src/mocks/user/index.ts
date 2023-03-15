import { rest } from 'msw'
import { db } from '@/mocks/db'

export default [
  rest.get('/api/users', (req, res, ctx) => {
    for (let i = 0; i < 10; i++) {
      db.user.create()
    }
    return res(ctx.json(db.user.findMany({ orderBy: { id: 'desc' } })))
  }),
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params
    const currentUser = db.user.findFirst({ where: { id: { equals: Number(id) } } })
    return res(ctx.json(currentUser))
  })
]
