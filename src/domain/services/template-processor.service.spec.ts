import { Provider } from '@nestjs/common';
import { TemplateProcessorService } from './template-processor.service';
import { Test, TestingModule } from '@nestjs/testing';

describe(TemplateProcessorService, () => {
  let service:TemplateProcessorService

  beforeAll(async () => {
    const providers: Provider[] = [
      TemplateProcessorService
    ];

    const module: TestingModule = await Test.createTestingModule({ providers }).compile();
    service = module.get<TemplateProcessorService>(TemplateProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should replace all context variables in template', () => {
    const result = service.process('the temperature in Alicante is %temperature%%temperature%', {temperature: 13});
    
    expect(result).toBe('the temperature in Alicante is 1313')
  })

  it('should not crash when variables are missing', () => {
    const result = service.process(`¿%temperature%ºC? It's boiling.`)

    expect(result).toBeDefined()
  })

  it('should revolve composed path', () => {
    const result = service.process(`That's an awesome day, it is %fullfilment.temperature% degrees`, {}, {fullfilment: { temperature: 35}});

    expect(result).toBe(`That's an awesome day, it is 35 degrees`)
  })

})