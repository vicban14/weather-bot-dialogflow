export class Fullfilment {
    allRequiredParamsPresent: Boolean;
    parameters: Object;
    action: string;
    fulfillmentText: string;
    text: string;
    speech: string;
    eventProcessed: boolean;
    creationDate: Date = new Date();
    fallback: boolean;
}