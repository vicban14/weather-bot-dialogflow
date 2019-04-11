import { Injectable, HttpService } from '@nestjs/common';
import { WeatherRepository } from '../data/weather.repository';
import { Weather } from '../domain/weather';

@Injectable()
export class WeatherService {

  constructor(private http: HttpService, private readonly weatherRepository: WeatherRepository) {}


  async conversationWebhook(dialogflowData: any) {
    const dataCity = dialogflowData.queryResult.parameters;

    const cityName = dataCity['geo-city'];
    const dialogDate = dataCity['date'].split('T').splice(0,1);

    const weather = await this.findByCityName(cityName, dialogDate)
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

  async findByCityName(cityName:string, dialogDate:string,): Promise<Weather> {
    
    return await this.weatherRepository.findByCityName(cityName)
  }

  responseMessage(cityName:string, dialogDate:string, degrees:number): string {
    console.log('aaad', degrees)
    let output = `El día ${dialogDate} en ${cityName} habrá una temperatura de ${degrees} ºC`;
    return output
  }
}
