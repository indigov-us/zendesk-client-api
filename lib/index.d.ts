export interface IFetchCredentials {
    subdomain: string;
    token: string;
    url: string;
}
export declare class ZendeskClientApi {
    private client;
    private fetchCredentials;
    constructor(client: Indigov.IZAFClient);
    getTriggers(): Promise<Zendesk.ITriggerList>;
    getResponses(): Promise<any>;
    private setFetchCredentials;
    private _request;
}
