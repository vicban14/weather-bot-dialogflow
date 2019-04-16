import { Injectable } from "@nestjs/common";
import { Action } from "../../data/models/action";
import { DoNothingAction } from "./action/do-nothing.action";
import { WeatherAction } from "./action/weather.action";

@Injectable()
export class ActionResolverService {
    private actionMap: any;

    constructor(private readonly weatherService: WeatherAction, private readonly doNothingAction: DoNothingAction){
        this.actionMap = {
            weather: this.weatherService,
            city: this.weatherService,
        }
    };

    resolve(actionName: string): Action {
        const action: Action = this.actionMap[actionName] || this.doNothingAction
        return action;
      }
}