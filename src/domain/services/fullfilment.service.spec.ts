import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FullfilmentService } from './fullfilment.service';
import { TemplateProcessorService } from "./template-processor.service";
import { Fullfilment } from "../../data/models/fullfilment";
import { ActionResolverService } from "./action-resolver.service";
import { Action } from 'src/data/models/action';

jest.mock('./template-processor.service');
jest.mock('./action-resolver.service');


describe('FullfilmentService', () => {
    let service: FullfilmentService;
    let module: TestingModule;
    let fullfillmentSample: Fullfilment;
    let templateProcessorService: TemplateProcessorService;
    let actionResolverService: ActionResolverService;
    

    beforeEach(async () => {
        const providers: Provider[] = [
            FullfilmentService,
            TemplateProcessorService,
            ActionResolverService
        ]
        module = await Test.createTestingModule({ providers }).compile();
        service = module.get<FullfilmentService>(FullfilmentService);
        actionResolverService = module.get<ActionResolverService>(ActionResolverService);
        templateProcessorService = module.get<TemplateProcessorService>(TemplateProcessorService);

        fullfillmentSample = {
            allRequiredParamsPresent: true,
            parameters: null,
            action: 'string',
            text: 'string',
            fulfillmentText: 'string',
            speech: 'string',
            eventProcessed: false,
            creationDate: new Date(),
            fallback: false
          };
    });

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should handle action when all parameters are present', async () => {
        let executed = false;
        const action : Action = {
            async execute() {
              executed = true
              return {}
            }
        }
        spyOn(actionResolverService, 'resolve').and.returnValue(action)

        await service.process(fullfillmentSample);

        expect(actionResolverService.resolve).toBeCalledTimes(1)
        expect(executed).toBeTruthy()
    })

    it('should not execute action when parameters are missing', async () => {
        
        spyOn(actionResolverService, 'resolve').and.returnValue(fullfillmentSample)

        fullfillmentSample.allRequiredParamsPresent = false;

        await service.process(fullfillmentSample);

        expect(actionResolverService.resolve).toHaveBeenCalledTimes(0);
    })
})

