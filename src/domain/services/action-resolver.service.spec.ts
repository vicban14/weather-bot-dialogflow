import { Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DoNothingAction } from "./action/do-nothing.action";
import { WeatherAction } from "./action/weather.action";
import { ActionResolverService } from './action-resolver.service';
import { JokesAction } from './action/jokes.action';

jest.mock('./action/do-nothing.action');
jest.mock('./action/weather.action');
jest.mock('./action/jokes.action')

describe('ActionResolverService', () => {
    let service: ActionResolverService;
    let doNothingAction: DoNothingAction;
    let weatherAction: WeatherAction;
    let jokesAction: JokesAction;

    beforeEach(async () => {
        const providers: Provider[] = [
            ActionResolverService,
            WeatherAction,
            DoNothingAction,
            JokesAction
        ]

        const module = await Test.createTestingModule({ providers }).compile();
        service = module.get<ActionResolverService>(ActionResolverService);
        doNothingAction = module.get<DoNothingAction>(DoNothingAction);
        weatherAction = module.get<WeatherAction>(WeatherAction);
        jokesAction = module.get<JokesAction>(JokesAction)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should resolve for undefined actions', () => {
        const result = service.resolve('undefined action')

        expect(result).toBe(doNothingAction)
    })

    it('should handle defined actions to show the weather', () => {
        const result = service.resolve('weather')

        expect(result).toBe(weatherAction)
    })

    it('should handle defined actions to show the weather only with the city name', () => {
        const result = service.resolve('city')

        expect(result).toBe(weatherAction)
    })

    it('should handle defined actions to joke about Chuck Norris', () => {
        const result = service.resolve('joke')

        expect(result).toBe(jokesAction)
    })


})