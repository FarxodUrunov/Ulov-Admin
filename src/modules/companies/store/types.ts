export const CompaniesAllType = {}

export interface Models {
  id: number
  name: string
}
export interface CarBrands {
  id: number
  name: string
  logo_path?: string
  models?: Models[]
}

export interface CompanyDataAll {
  company_id?: number
  id: number
  name: string
  image_url?: string
  phone?: string
  created_at?: string
  working_time?: {
    days?: string[]
    end_time?: string
    start_time?: string
  }
  rating?: number | null
  is_free?: boolean
  address?: string
  services?: string[]
}

export interface WorkingTimes {
  day_type: string
  start_time: string
  end_time: string
}

export interface CreateCompany {
  company_id?: number
  image_url?: string
  type?: string
  name?: string
  phone?: string
  status?: string
  payment_types?: (string | undefined)[]
  address?: {
    street?: string
    lat?: number
    long?: number
    district?: string
    region?: string
    country?: string
  }
  working_times?: (WorkingTimes | undefined)[]
}

export interface CreateInfo {}

// "description": "fdfd",
// "photos": ["dsd.jpg"],
// "car_brand_ids": [1],
// "tags": [
//   {
//     "tag_group_id": 1,
//     "tag_details": [
//       {
//         "price": 133,
//         "tag_ids": [1, 2]
//       },
//       {
//         "price": 200,
//         "tag_ids": [3]
//       }
//     ]
//   }
// ]

export interface Tags {
  id: number
  name: string
}
export interface ServicesTags {
  id: number
  title: string
  logo_path: string
  tags: Tags[]
}
