import { Injectable, HttpService } from '@nestjs/common';
import { WeatherRepository } from '../data/weather.repository';
import { Weather } from '../domain/weather';

@Injectable()
export class WeatherService {

  constructor(private http: HttpService, private readonly weatherRepository: WeatherRepository) {}

  async findByCityName(cityName:string): Promise<Weather> {
    return await this.weatherRepository.findByCityName(cityName)
  }

  
}
