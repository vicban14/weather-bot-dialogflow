import { Injectable} from '@nestjs/common';
import { AxiosInstance, default as Axios } from 'axios';

@Injectable()
export class WeatherRepository {

    private client: AxiosInstance;

    constructor() {
      this.client = Axios.create({
        baseURL: 'http://api.openweathermap.org/data/2.5/'
      });
    }


  async findByCityName(cityName:string) {
    return (this.client.get(`weather?q=${cityName}&APPID=351eb4b7ae19108f601b296a71970c27&units=metric`))
  }

}