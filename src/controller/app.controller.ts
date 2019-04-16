import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { WeatherAction } from 'src/domain/services/action/weather.action';
import { ConversationService } from 'src/domain/services/conversation.service';


@Controller()
export class AppController {
  apiArray: Array<object>;

  constructor(private readonly weatherService: WeatherAction, private readonly conversationService: ConversationService) {
  }

  @Post('/webhook')

  async conversationWebhook(@Body() dialogflowData: any) {
    return this.conversationService.conversationWebhook(dialogflowData)
    .then((actionResult: any) => {
      return { fulfillmentText: actionResult }
    })
    
  }


  async findByCityName(cityName: string): Promise<number> {
    return await this.weatherService.execute(cityName)
      .then((temperature:any)=>{
        return temperature
      })
    }
}
