import * as Zendesk from './IZendesk';
export interface IParamaters {
    subdomain: string;
    token: string;
    url: string;
    ticket_field_title: string;
    user_county_field_id: string;
    L2BlackoutEnabled: boolean;
}
export declare class ZendeskClientApi {
    private client;
    private paramaters;
    constructor(client: any);
    getTriggers(): Promise<Zendesk.ITriggerList>;
    private extractCategoriesFromCustomFields;
    getCounties(): Promise<any>;
    getTicketFields(): Promise<any>;
    getResponses(): Promise<any>;
    isL2BlackoutEnabled(): Promise<boolean>;
    deleteAllL2Users(): Promise<void>;
    private getParamaters;
    private _request;
}
