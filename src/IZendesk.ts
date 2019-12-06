export interface CustomFieldOptions {
  id?: number
  name: string
  value: string
}

export interface IPagination {
  previous_page: number | null
  next_page: number | null
  count: number | null
}

export interface IPagination {
  previous_page: number | null
  next_page: number | null
  count: number | null
}

export interface ICustomUserField {
  email: string
  external_id: string
  name: string
  user_fields: {
    first_name: string
    last_name: string
    middle_name: string
    suffix: string
    birthday: string
    email_address_flag: boolean
    home_address_flag: boolean
    home_address_line_1: string
    home_address_line_2: string
    home_address_city: string
    home_address_state: string
    home_address_zip_code: string
    home_address_district: string
    home_address_county: string
    home_address_precinct: string
    home_address_phone: string
    no_mail_flag?: boolean
    no_bulk_mail_flag?: boolean
    household_flag?: boolean
    salutation?: string
    last_bulk_mailer_sent_on?: string
  }
}

export interface TicketField {
  custom_field_options: CustomFieldOptions[]
  id: number
  title: string
}

export interface Action {
  field: string
  value: string
}

export interface Macro {
  id: number
  title: string
  description: string
  active: boolean
  actions: Action[]
  category: string
  created_at: Date
  updated_at: Date
}

export interface FetchCredentials {
  subdomain: string
  token: string
  url: string
}

export interface ITriggerConditionProperties {
  field: string
  operator: string
  value: string
}

export interface ITriggerConditions {
  all: ITriggerConditionProperties
  any: ITriggerConditionProperties
}

export interface ITrigger {
  id: number
  title: string
  active: boolean
  actions: Action[]
  conditions: ITriggerConditions
  description: string
  category: string
  created_at: Date
  updated_at: Date
}

export interface TicketField {
  custom_field_options: CustomFieldOptions[]
  id: number
  title: string
}

export interface Action {
  field: string
  value: string
}

export interface Macro {
  id: number
  title: string
  description: string
  active: boolean
  actions: Action[]
  category: string
  created_at: Date
  updated_at: Date
}

export interface FetchCredentials {
  subdomain: string
  token: string
  url: string
}

export interface ITriggerConditionProperties {
  field: string
  operator: string
  value: string
}

export interface ITriggerConditions {
  all: ITriggerConditionProperties
  any: ITriggerConditionProperties
}

export interface ITriggerList extends IPagination {
  triggers: ITrigger[]
}

export interface ITrigger {
  id: number
  title: string
  active: boolean
  actions: Action[]
  conditions: ITriggerConditions
  description: string
  category: string
  created_at: Date
  updated_at: Date
}
