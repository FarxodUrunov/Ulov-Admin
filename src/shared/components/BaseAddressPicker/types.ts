import { type InferType, array, number, object, string } from 'yup'

export const addressSchema = object({
  country: string().required('Country is required'),
  region: string().required('Region is required'),
  district: string().required('District is required'),
  address: string().required('Address is required'),
  coords: array()
    .of(number().required('Coords is required'))
    .min(1, 'Coords is required')
    .required('Coords is required')
})

export type AddressValue = InferType<typeof addressSchema>
