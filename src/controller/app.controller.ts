import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { WeatherService } from 'src/services/weather.service';
import { ConversationService } from 'src/services/conversation.service';


@Controller()
export class AppController {
  apiArray: Array<object>;

  constructor(private readonly weatherService: WeatherService, private readonly conversationService: ConversationService) {
  }

  @Post('/webhook')

  async conversationWebhook(@Body() dialogflowData: any) {
    return this.conversationService.conversationWebhook(dialogflowData)
    .then((actionResult: any) => {
      return { fulfillmentText: actionResult }
    })
    
  }


  async findByCityName(cityName: string): Promise<number> {
    return await this.weatherService.findByCityName(cityName)
      .then((temperature:any)=>{
        return temperature
      })
    }
}
