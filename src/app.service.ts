import { Injectable, HttpService } from '@nestjs/common';
import { Response } from 'express';


@Injectable()
export class AppService {

  constructor(private http: HttpService) {}

  async getCallCityApi(cityName:string): Promise<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=351eb4b7ae19108f601b296a71970c27`)
    .toPromise()
  }

  responseDataToDialogflow(cityName:string, dialogDate:string, degrees:number): string {
    let output = `El día ${dialogDate} en ${cityName} habrá una temperatura de ${degrees} ºC`;
    return output
  }
}
