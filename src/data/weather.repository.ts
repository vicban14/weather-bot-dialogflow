import { Injectable} from '@nestjs/common';
import { AxiosInstance, default as Axios } from 'axios';
import { Weather } from '../domain/weather';

@Injectable()
export class WeatherRepository {

    private client: AxiosInstance;

    constructor() {
      this.client = Axios.create({
        baseURL: 'http://api.openweathermap.org/data/2.5/'
      });
    }


  async findByCityName(cityName:string): Promise<Weather> {
    return await (this.client.get(`weather?q=${cityName}&APPID=351eb4b7ae19108f601b296a71970c27&units=metric`)).then((response) => {

      const result : Weather = new Weather()

      result.date = new Date()
      result.cityName = cityName
      result.temperature = response.data.main.temp

      return result
    })
  }
}