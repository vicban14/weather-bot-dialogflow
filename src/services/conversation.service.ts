import { Injectable, HttpService } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { TemplateProcessorService } from './template-processor.service';




@Injectable()
export class ConversationService {

  constructor(private http: HttpService, private readonly weatherService: WeatherService, private readonly templateProcessorService: TemplateProcessorService) {}


  async conversationWebhook(dialogflowData: any) {
    const dataCity = dialogflowData.queryResult.parameters;
    const cityName = dataCity['geo-city'];
    const weather = await this.weatherService.findByCityName(cityName)

    const textTemplate = dialogflowData.queryResult.fulfillmentText
    const getTemperature = this.responseParameter(weather.temperature)
    const fulfillmentParamaters = getTemperature.parameters

    const response = this.templateProcessorService.process(textTemplate, fulfillmentParamaters)

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