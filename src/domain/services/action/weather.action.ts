import { Injectable } from '@nestjs/common';
import { WeatherRepository } from '../../../data/weather.repository';
import { Weather } from '../../../data/models/weather';
import { Action } from '../../../data/models/action'
import { ActionResult } from '../../../data/models/action-result';


@Injectable()
export class WeatherAction implements Action {

  constructor(private readonly weatherRepository: WeatherRepository) {}
  
  async execute(parameters: any): Promise<ActionResult> {
    const response = await this.weatherRepository.findByCityName(parameters['geo-city'])
    const result: ActionResult = new ActionResult()
    

      result.variables = { temperature : response.data.main.temp }
      
    return result
  }
  
}

  
