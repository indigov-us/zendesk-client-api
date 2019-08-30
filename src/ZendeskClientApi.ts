import * as Zendesk from './IZendesk'

export interface IFetchCredentials {
  subdomain: string
  token: string
  url: string
  ticket_field_title: string
}

interface IRequestHeaders {
  path: string
  subdomain: string
  token: string
}

interface IRequestOptions {
  path: string
  type?: string
  data?: any
}

enum EMethodsTypes {
  POST = 'POST',
  GET = 'GET'
}

export class ZendeskClientApi {
  // Using an uninitialized private can be avoided if we want to
  // call client.function for every request.
  private fetchCredentials!: IFetchCredentials

  constructor(private client: any) {}

  public async getTriggers(): Promise<Zendesk.ITriggerList> {
    await this.setFetchCredentials()

    return await this._request({
      path: '/triggers',
      type: EMethodsTypes.GET
    })
  }

  public async getTicketFields(): Promise<any> {
    await this.setFetchCredentials()

    const data = await this._request({
      path: '/ticket_fields',
      type: EMethodsTypes.GET
    })
    const topicsField = data.ticket_fields.find(
      (f: any) => f.title === this.fetchCredentials.ticket_field_title
    )

    return {
      fields: topicsField.custom_field_options,
      id: topicsField.id
    }
  }

  // This is a quick method to test with
  public async getResponses(): Promise<any> {
    await this.setFetchCredentials()

    return await this._request({
      path: '/ticket_fields',
      type: EMethodsTypes.GET
    })
  }

  private async setFetchCredentials(): Promise<IFetchCredentials> {
    const context = await this.client.context()
    const metadata = await this.client.metadata()

    this.fetchCredentials = {
      subdomain: context.account.subdomain,
      token: metadata.settings.proxy_token,
      url: metadata.settings.proxy_url,
      ticket_field_title: metadata.settings.ticket_field_title
    }

    return this.fetchCredentials
  }

  private async _request({ path, type, data }: IRequestOptions): Promise<any> {
    const { subdomain, token, url } = this.fetchCredentials

    return await this.client
      .request({
        contentType: 'application/json',
        data,
        dataType: 'JSON',
        headers: {
          'X-ZDAAP-Path': path,
          'X-ZDAAP-Subdomain': subdomain,
          'X-ZDAAP-Token': token
        },
        type: type || EMethodsTypes.GET,
        url
      })
      .catch(e => {
        console.error(e)
      })
  }
}
