import { Provider } from '@nestjs/common';
import { TemplateProcessorService } from './template-processor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { Weather } from '../../data/models/weather';
import { WeatherRepository } from '../../data/weather.repository';

describe('WeatherService', () => {
    let module: TestingModule;
    let service: WeatherService;

    beforeAll(async () => {
        const providers: Provider[] = [
          TemplateProcessorService,
          WeatherService,
          WeatherRepository,
          Weather
        ];
        module = await Test.createTestingModule({ providers }).compile();
        service = module.get<WeatherService>(WeatherService);
      });
    
    it('should be defined', () => {
      expect(service).toBeDefined();
    })

    it('should return a function and create a Weather object', () => {
      const WeatherRepo = module.get<WeatherRepository>(WeatherRepository)

      spyOn(service, 'findByCityName').and.returnValue(Promise.resolve(Weather))

      WeatherRepo.findByCityName('city')
      .then((result) => {
        expect(service.findByCityName('Barcelona')).toEqual(Weather)
      })


     
    })

})