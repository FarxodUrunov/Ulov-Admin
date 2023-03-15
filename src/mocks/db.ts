import { factory } from '@mswjs/data'
import UserFactory from '@/mocks/user/factory'

export const db = factory({
  user: UserFactory
})
