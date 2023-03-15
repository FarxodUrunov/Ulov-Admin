export interface Branch {
  id: number
  logo: string
  name: string
}

export interface ServiceData {
  id: number
  branch: Branch
  created_at: string
  distance: number
  number_of_card: number
  number_of_services: string
  price: number
  service: {
    mechanic: string
    part_amount: number
    tag_group: string
    type_of_measure: string
  }
  status: string
}
