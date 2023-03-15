import { primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export default {
  id: primaryKey(() => faker.datatype.number()),
  first_name: () => faker.name.firstName(),
  last_name: () => faker.name.lastName(),
  phone: () => faker.phone.imei(),
  date_of_birth: () => faker.date.birthdate(),
  gender: () => faker.datatype.number({ min: 0, max: 3 }),
  status: () => faker.datatype.number({ min: 0, max: 3 }),
  address: {
    delivery: {
      name: () => faker.name.fullName(),
      lat: () => faker.address.latitude(),
      long: () => faker.address.longitude(),
      region: () => faker.address.city()
    }
  },
  role_id: () => faker.datatype.uuid(),
  avatar_id: () => faker.datatype.uuid(),
  created_at: () => faker.date.past(),
  updated_at: () => faker.date.past()
}
