import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { TemplateProcessorService } from './template-processor.service';
import { WeatherService } from './weather.service';
import { WeatherRepository } from '../../data/weather.repository';
import { Weather } from '../../data/models/weather';

describe('ConversationService', () => {
  let module: TestingModule;
  let service: ConversationService;

  beforeAll(async () => {
    const providers: Provider[] = [
      ConversationService,
      WeatherService,
      TemplateProcessorService,
      WeatherRepository,
      Weather
    ];
    module = await Test.createTestingModule({ providers }).compile();
    service = module.get<ConversationService>(ConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return an object weather', () => {
      const weatherService = module.get<WeatherService>(WeatherService)
      const date = new Date();
      const objectWeather = {
        temperature: 1,
        cityName: 'city',
        date: date
      } 

      spyOn(weatherService, 'findByCityName').and.returnValue(objectWeather)

      expect(weatherService.findByCityName('city')).toEqual({
        temperature: 1,
        cityName: 'city',
        date: date
      });
    })

  it ('should return the temperature number', () => {
    const result = service.responseParameter(1)

    expect(result).toEqual({ parameters: { temperature: 1 } })
  })
     
  it ('should return the response as a string that have changed the %word% by temperature', () => {
  const templateProcessor = module.get<TemplateProcessorService>(TemplateProcessorService)

  spyOn(templateProcessor, 'process').and.returnValue('El tiempo en Madrid es de 12.4 C')

  expect(templateProcessor.process('El tiempo en Madrid es de %temperature% C', { temperature: 12.4 })).toEqual('El tiempo en Madrid es de 12.4 C')
  });

})