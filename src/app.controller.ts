import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  apiArray: Array<object>;

  constructor(private readonly appService: AppService) {
  }

  @Post('/webhook')
  async dialogflowWebhook(@Body() dialogflowData: any) {

    const dataCity = dialogflowData.queryResult.parameters;

    const cityName = dataCity['geo-city'];
    const dialogDate = dataCity['date'];

    const degrees = await this.getCallApi(cityName, dialogDate)
    const actionResult = {
      variables: {
        temperature: degrees
      }
    }
    const output = this.appService.responseDataToDialogflow(cityName, dialogDate, degrees)
    console.log(output)

    return { fulfillmentText: output }
  }


  async getCallApi(cityName: string, dialogDate: string): Promise<number> {
    return await this.appService.getCallCityApi(cityName)
      .then((dataCity: any) => {
        let apiArray = dataCity.data.list
        let degrees
        
        apiArray.forEach(dayWeather => {
          let dateSplit = dayWeather.dt_txt.split(" ")

          if (dateSplit[0] === dialogDate && dateSplit[1] === '12:00:00') {
            degrees = Math.trunc(+dayWeather.main.temp - 273.15)
          } console.log('aaaaa' + degrees)
        })
        console.log('bbbbb' + degrees)
        return degrees
      })
    }
}
