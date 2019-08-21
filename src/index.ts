export interface IFetchCredentials {
  subdomain: string
  token: string
  url: string
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

  constructor(private client: Indigov.IZAFClient) {
    this.setFetchCredentials()
  }

  public async getTriggers(): Promise<Zendesk.ITriggerList> {
    return await this._request({
      path: '/triggers',
      type: EMethodsTypes.GET
    })
  }

  // This is a quick method to test with
  public async getResponses(): Promise<any> {
    return await this._request({
      path: '/ticket_fields',
      type: EMethodsTypes.GET
    })
  }

  private async setFetchCredentials(): Promise<IFetchCredentials> {
    if (this.fetchCredentials) return this.fetchCredentials

    console.log('sssset it')
    
    const metadata = await this.client.metadata()
    const context = await this.client.context()

    return (this.fetchCredentials = {
      subdomain: context.account.subdomain,
      token: metadata.settings.proxy_token,
      url: metadata.settings.proxy_url
    })
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
