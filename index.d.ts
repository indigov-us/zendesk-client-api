interface WindowClientContext {
  account: {
    subdomain: string
  }
}

declare module Indigov {
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
