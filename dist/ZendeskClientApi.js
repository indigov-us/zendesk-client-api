"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getTriggers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setFetchCredentials();
            return yield this._request({
                path: '/triggers',
                type: EMethodsTypes.GET
            });
        });
    }
    getTicketFields() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setFetchCredentials();
            const data = yield this._request({
                path: '/ticket_fields',
                type: EMethodsTypes.GET
            });
            const topicsField = data.ticket_fields.find((f) => f.title === this.fetchCredentials.ticket_field_title);
            return {
                fields: topicsField.custom_field_options,
                id: topicsField.id
            };
        });
    }
    getResponses() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setFetchCredentials();
            return yield this._request({
                path: '/ticket_fields',
                type: EMethodsTypes.GET
            });
        });
    }
    setFetchCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.client.context();
            const metadata = yield this.client.metadata();
            this.fetchCredentials = {
                subdomain: context.account.subdomain,
                token: metadata.settings.proxy_token,
                url: metadata.settings.proxy_url,
                ticket_field_title: metadata.settings.ticket_field_title
            };
            return this.fetchCredentials;
        });
    }
    _request({ path, type, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subdomain, token, url } = this.fetchCredentials;
            return yield this.client
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
        });
    }
}
exports.ZendeskClientApi = ZendeskClientApi;
//# sourceMappingURL=ZendeskClientApi.js.map