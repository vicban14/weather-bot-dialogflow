import { Injectable, HttpService } from '@nestjs/common';
import { WeatherRepository } from '../data/weather.repository';
import { WeatherService } from './weather.service';



@Injectable()
export class ConversationService {

  constructor(private http: HttpService, private readonly weatherService: WeatherService) {}


  async conversationWebhook(dialogflowData: any) {
    const dataCity = dialogflowData.queryResult.parameters;

    const cityName = dataCity['geo-city'];
    const dialogDate = dataCity['date'].split('T').splice(0,1);

    const weather = await this.weatherService.findByCityName(cityName, dialogDate)
    console.log(JSON.stringify(weather))
    // const actionResult = {
    //   variables: {
    //     temperature: degrees
    //   }
    // }
    const output = this.responseMessage(weather.cityName, weather.date.toISOString(), weather.temperature)
    
    console.log(output)
    return output
  }

  responseMessage(cityName:string, dialogDate:string, degrees:number): string {
    console.log('aaad', degrees)
    let output = `El día ${dialogDate} en ${cityName} habrá una temperatura de ${degrees} ºC`;
    return output
  }

}