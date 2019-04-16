import { Injectable } from '@nestjs/common';
import { WeatherAction } from './action/weather.action';
import { TemplateProcessorService } from './template-processor.service';
import { MapperService } from './mapper.service';
import { ConversationOutputDto } from '../../data/models/conversation.dtos';
import { FullfilmentService } from './fullfilment.service';


@Injectable()
export class ConversationService {

  constructor(
    private readonly mapperService: MapperService,
    private readonly fullfilmentService: FullfilmentService
    ) {}


  async conversationWebhook(dialogflowData: any) {
    const fullfilment = await this.mapperService.mapEvent(dialogflowData)
    let conversationOutputDto: ConversationOutputDto = null;

    conversationOutputDto = await this.fullfilmentService.process(fullfilment);

    return conversationOutputDto.text

    // const dataCity:object = dialogflowData.queryResult.outputContexts[0].parameters;
    // const cityName:string = dataCity['geo-city'];
    // const weather:Weather = await this.weatherService.findByCityName(cityName)

    // const textTemplate:string = dialogflowData.queryResult.fulfillmentText
    // const getTemperature = this.responseParameter(weather.temperature)
    // const fulfillmentParamaters:object = getTemperature.parameters
    
    // const response:string = this.templateProcessorService.process(textTemplate, fulfillmentParamaters)

    // return response
  }

  // responseParameter(temperature:number) {

  //   const parameter = {
  //       parameters: {
  //            temperature: temperature
  //           }
  //       };
  //   return parameter
  // }

}