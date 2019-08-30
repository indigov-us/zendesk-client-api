import * as Zendesk from './IZendesk';
export interface IFetchCredentials {
    subdomain: string;
    token: string;
    url: string;
    ticket_field_title: string;
}
export declare class ZendeskClientApi {
    private client;
    private fetchCredentials;
    constructor(client: any);
    getTriggers(): Promise<Zendesk.ITriggerList>;
    getTicketFields(): Promise<any>;
    getResponses(): Promise<any>;
    private setFetchCredentials;
    private _request;
}
