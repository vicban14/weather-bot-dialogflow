import { Injectable } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { TemplateProcessorService } from './template-processor.service';
import { Weather } from 'src/data/models/weather';


@Injectable()
export class ConversationService {

  constructor(private readonly weatherService: WeatherService, private readonly templateProcessorService: TemplateProcessorService) {}


  async conversationWebhook(dialogflowData: any):Promise<string> {
    const dataCity:object = dialogflowData.queryResult.parameters;
    const cityName:string = dataCity['geo-city'];
    const weather:Weather = await this.weatherService.findByCityName(cityName)

    const textTemplate:string = dialogflowData.queryResult.fulfillmentText
    const getTemperature = this.responseParameter(weather.temperature)
    const fulfillmentParamaters:object = getTemperature.parameters
    
    const response:string = this.templateProcessorService.process(textTemplate, fulfillmentParamaters)

    return response
  }

  responseParameter(temperature:number) {

    const parameter = {
        parameters: {
             temperature: temperature
            }
        };
    return parameter
  }

}