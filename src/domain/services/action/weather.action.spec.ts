import { Provider } from '@nestjs/common';
import { TemplateProcessorService } from '../template-processor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherAction} from './weather.action';
import { Weather } from '../../../data/models/weather';
import { WeatherRepository } from '../../../data/weather.repository';

describe('WeatherService', () => {
    let module: TestingModule;
    let service: WeatherAction;

    beforeAll(async () => {
        const providers: Provider[] = [
          TemplateProcessorService,
          WeatherAction,
          WeatherRepository,
          Weather
        ];
        module = await Test.createTestingModule({ providers }).compile();
        service = module.get<WeatherAction>(WeatherAction);
      });
    
    it('should be defined', () => {
      expect(service).toBeDefined();
    })

    it('should return a function and create a Weather object', () => {
      const WeatherRepo = module.get<WeatherRepository>(WeatherRepository)

      spyOn(service, 'execute').and.returnValue(Promise.resolve(Weather))

      WeatherRepo.findByCityName('city')
      .then((result) => {
        expect(service.execute('Barcelona')).toEqual(Weather)
      })


     
    })

})