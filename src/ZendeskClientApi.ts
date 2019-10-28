import * as Zendesk from './IZendesk'

export interface IParamaters {
  subdomain: string
  token: string
  url: string
  ticket_field_title: string
  user_county_field_id: string
  L2BlackoutEnabled: boolean
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
interface IRequestOptsions {
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
  private paramaters!: IParamaters

  constructor(private client: any) {}

  public async getTriggers(): Promise<Zendesk.ITriggerList> {
    await this.getParamaters()

    return await this._request({
      path: '/triggers',
      type: EMethodsTypes.GET
    })
  }

  private extractCategoriesFromCustomFields(options: any): string[] {
    const categories: string[] = []
    options.forEach((o: { name: string }) => {
      const match = o.name.match(/(.[^::]+)::.+/) || ''
      if (match[1] && !categories.includes(match[1])) {
        categories.push(match[1])
      }
    })

    return categories
  }

  public async getCounties(): Promise<any> {
    await this.getParamaters()
    return this.paramaters.user_county_field_id.split(', ')
  }

  public async getTicketFields(): Promise<any> {
    await this.getParamaters()
    const data = await this._request({
      path: '/ticket_fields',
      type: EMethodsTypes.GET
    })
    const topicsField = data.ticket_fields.find(
      (f: any) => f.title === this.paramaters.ticket_field_title
    )

    return {
      categories: this.extractCategoriesFromCustomFields(topicsField.custom_field_options),
      fields: topicsField.custom_field_options,
      id: topicsField.id
    }
  }

  // This is a quick method to test with
  public async getResponses(): Promise<any> {
    await this.getParamaters()

    return await this._request({
      path: '/ticket_fields',
      type: EMethodsTypes.GET
    })
  }

  public async isL2BlackoutEnabled(): Promise<boolean> {
    const { L2BlackoutEnabled } = await this.getParamaters()
    return L2BlackoutEnabled
  }

  public async deleteAllL2Users(): Promise<void> {
    let url: string | null = '/api/v2/users/search.json?query=l2.com' // add &per_page=5 to debug pagination
    let count = 1
    do {
      const res: any = await this.client.request(url)

      console.log('Indigov: res.users', res.users)
      const userIds = res.users
        .map((user: any) => {
          return user.id
        })
        .join(',')
      console.log('Indigov: userIds', userIds)
      if (res.users.length) {
        const delRes = await this.client.request({
          type: 'DELETE',
          url: `/api/v2/users/destroy_many.json?ids=${userIds}`
        })
        console.log('Indigov: delRes', delRes)
      }

      url = res.next_page
      console.log('Indigov: count++', count++)
    } while (url)
  }

  private async getParamaters(): Promise<IParamaters> {
    const context = await this.client.context()
    const metadata = await this.client.metadata()

    this.paramaters = {
      subdomain: context.account.subdomain,
      token: metadata.settings.proxy_token,
      url: metadata.settings.proxy_url,
      ticket_field_title: metadata.settings.ticket_field_title,
      user_county_field_id: metadata.settings.user_county_field_id,
      L2BlackoutEnabled: metadata.settings.L2BlackoutEnabled
    }

    return this.paramaters
  }

  private async _request({ path, type, data }: IRequestOptions): Promise<any> {
    await this.getParamaters()
    const { subdomain, token, url } = this.paramaters

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
