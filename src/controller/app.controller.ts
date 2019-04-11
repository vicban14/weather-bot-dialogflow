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
    .then((output: string) => {
      return { fulfillmentText: output }
    })
    
  }


  async findByCityName(cityName: string, dialogDate: string): Promise<number> {
    return await this.weatherService.findByCityName(cityName, dialogDate)
      .then((degrees:any)=>{
        return degrees
      })
    }
}
