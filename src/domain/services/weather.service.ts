import { Injectable } from '@nestjs/common';
import { WeatherRepository } from '../../data/weather.repository';
import { Weather } from '../../data/models/weather';

@Injectable()
export class WeatherService {

  constructor(private readonly weatherRepository: WeatherRepository) {}

  async findByCityName(cityName:string): Promise<Weather> {
      const response = await this.weatherRepository.findByCityName(cityName)

      const result : Weather = new Weather()

      result.date = new Date()
      result.cityName = cityName
      result.temperature = response.data.main.temp

      return result
    }
}

  
