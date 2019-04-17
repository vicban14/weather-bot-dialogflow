import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { WeatherAction } from 'src/domain/services/action/weather.action';
import { ConversationService } from 'src/domain/services/conversation.service';
import { JokesAction } from 'src/domain/services/action/jokes.action';


@Controller()
export class AppController {
  apiArray: Array<object>;

  constructor(private readonly weatherAction: WeatherAction, 
    private readonly conversationService: ConversationService,
    private readonly jokesAction: JokesAction ) {
  }

  @Post('/webhook')

  async conversationWebhook(@Body() dialogflowData: any) {
    return this.conversationService.conversationWebhook(dialogflowData)
    .then((actionResult: any) => {
      return { fulfillmentText: actionResult }
    })
    
  }


  async findByCityName(cityName: string): Promise<number> {
    return await this.weatherAction.execute(cityName)
      .then((temperature:any)=>{
        return temperature
      })
    }
  

  async findJokeRandom(): Promise<String> {
      return await this.jokesAction.execute()
        .then((temperature:any)=>{
          return temperature
      })
    }
}
