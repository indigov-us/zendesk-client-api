declare namespace Zendesk {
  interface CustomFieldOptions {
    id?: number
    name: string
    value: string
  }

  interface IPagination {
    previous_page: number | null
    next_page: number | null
    count: number | null
  }

  interface TicketField {
    custom_field_options: CustomFieldOptions[]
    id: number
    title: string
  }

  interface Action {
    field: string
    value: string
  }

  interface Macro {
    id: number
    title: string
    description: string
    active: boolean
    actions: Action[]
    category: string
    created_at: Date
    updated_at: Date
  }

  interface FetchCredentials {
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
}

interface WindowClientContext {
  account: {
    subdomain: string
  }
}

declare namespace Indigov {
  interface IZAFClient {
    context: () => Promise<{
      account: {
        subdomain: string
      }
    }>
    metadata: () => Promise<{
      settings: {
        proxy_token: string
        proxy_url: string
        ticket_field_title: string
      }
    }>
    request: (
      options:
        | string
        | {
            contentType: string
            data?: string
            dataType?: string
            headers?: any
            processData?: boolean
            type: string
            url: string
          }
    ) => Promise<any>
  }
}
