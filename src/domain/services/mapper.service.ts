import { Injectable } from '@nestjs/common';
import { Fullfilment } from 'src/data/models/fullfilment';
import * as ObjectPath from 'object-path';

@Injectable()
export class MapperService {

    constructor() {}

   public mapEvent(interpreterResponse: any): Fullfilment {
    const parameters = interpreterResponse.queryResult.parameters;
  
    return this._map(interpreterResponse, parameters);
    }

    private _map(interpreterResponse: any, parameters: any): any {
        const result = interpreterResponse.queryResult;
        const fulfillmentText = this._getText(result);
        const text = ObjectPath.get('text', fulfillmentText);
        const speech = ObjectPath.get('speech', fulfillmentText);

        const response: Fullfilment = {
          allRequiredParamsPresent: result.allRequiredParamsPresent,
          parameters: parameters,
          fulfillmentText,
          action: result.action,
          text,
          speech,
          eventProcessed: !!interpreterResponse.webhookStatus,
          creationDate: new Date(),
          fallback: result.intent.isFallback
        };
        return response;
    }

    private _getText(response: any) {
        if (response.fulfillmentText) {
          return response.fulfillmentText;
        }
  
        return response.fulfillmentMessages[0].text.text[0];
      }

}