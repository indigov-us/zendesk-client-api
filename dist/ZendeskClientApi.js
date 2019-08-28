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
        this.setFetchCredentials();
    }
    getTriggers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request({
                path: '/triggers',
                type: EMethodsTypes.GET
            });
        });
    }
    getResponses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request({
                path: '/ticket_fields',
                type: EMethodsTypes.GET
            });
        });
    }
    setFetchCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fetchCredentials)
                return this.fetchCredentials;
            const metadata = yield this.client.metadata();
            const context = yield this.client.context();
            return (this.fetchCredentials = {
                subdomain: context.account.subdomain,
                token: metadata.settings.proxy_token,
                url: metadata.settings.proxy_url
            });
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