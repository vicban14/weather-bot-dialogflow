import { Injectable } from "@nestjs/common";
import { Action } from "../../data/models/action";
import { DoNothingAction } from "./action/do-nothing.action";
import { WeatherAction } from "./action/weather.action";
import { JokesAction } from "./action/jokes.action";

@Injectable()
export class ActionResolverService {
    private actionMap: any;

    constructor(private readonly weatherAction: WeatherAction,
        private readonly doNothingAction: DoNothingAction, 
        private readonly jokesAction: JokesAction){
        this.actionMap = {
            weather: this.weatherAction,
            city: this.weatherAction,
            joke: this.jokesAction
        }
    };

    resolve(actionName: string): Action {
        const action: Action = this.actionMap[actionName] || this.doNothingAction
        return action;
      }
}