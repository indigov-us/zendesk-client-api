"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EMethodsTypes;
(function (EMethodsTypes) {
    EMethodsTypes["POST"] = "POST";
    EMethodsTypes["GET"] = "GET";
})(EMethodsTypes || (EMethodsTypes = {}));
class ZendeskClientApi {
    constructor(client) {
        this.client = client;
    }
    async getTriggers() {
        await this.getParamaters();
        return await this._request({
            path: '/triggers',
            type: EMethodsTypes.GET
        });
    }
    extractCategoriesFromCustomFields(options) {
        const categories = [];
        options.forEach((o) => {
            const match = o.name.match(/(.[^::]+)::.+/) || '';
            if (match[1] && !categories.includes(match[1])) {
                categories.push(match[1]);
            }
        });
        return categories;
    }
    async getCounties() {
        await this.getParamaters();
        return this.paramaters.user_county_field_id.split(', ');
    }
    async getTicketFields() {
        await this.getParamaters();
        const data = await this._request({
            path: '/ticket_fields',
            type: EMethodsTypes.GET
        });
        const topicsField = data.ticket_fields.find((f) => f.title === this.paramaters.ticket_field_title);
        return {
            categories: this.extractCategoriesFromCustomFields(topicsField.custom_field_options),
            fields: topicsField.custom_field_options,
            id: topicsField.id
        };
    }
    async getResponses() {
        await this.getParamaters();
        return await this._request({
            path: '/ticket_fields',
            type: EMethodsTypes.GET
        });
    }
    async isL2BlackoutEnabled() {
        const { L2BlackoutEnabled } = await this.getParamaters();
        return L2BlackoutEnabled;
    }
    async deleteAllL2Users() {
        let url = '/api/v2/users/search.json?query=l2.com';
        let count = 1;
        do {
            const res = await this.client.request(url);
            console.log('Indigov: res.users', res.users);
            const userIds = res.users
                .map((user) => {
                return user.id;
            })
                .join(',');
            console.log('Indigov: userIds', userIds);
            if (res.users.length) {
                const delRes = await this.client.request({
                    type: 'DELETE',
                    url: `/api/v2/users/destroy_many.json?ids=${userIds}`
                });
                console.log('Indigov: delRes', delRes);
            }
            url = res.next_page;
            console.log('Indigov: count++', count++);
        } while (url);
    }
    async getParamaters() {
        const context = await this.client.context();
        const metadata = await this.client.metadata();
        this.paramaters = {
            subdomain: context.account.subdomain,
            token: metadata.settings.proxy_token,
            url: metadata.settings.proxy_url,
            ticket_field_title: metadata.settings.ticket_field_title,
            user_county_field_id: metadata.settings.user_county_field_id,
            L2BlackoutEnabled: metadata.settings.L2BlackoutEnabled
        };
        return this.paramaters;
    }
    async _request({ path, type, data }) {
        await this.getParamaters();
        const { subdomain, token, url } = this.paramaters;
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
            console.error(e);
        });
    }
}
exports.ZendeskClientApi = ZendeskClientApi;
//# sourceMappingURL=ZendeskClientApi.js.map