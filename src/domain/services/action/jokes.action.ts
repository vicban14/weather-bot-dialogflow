import { Injectable } from "@nestjs/common";
import { Action } from "src/data/models/action";
import { JokesRepository } from "../../../data/jokes.respository";
import { ActionResult } from "../../../data/models/action-result";

@Injectable()
export class JokesAction implements Action {
    
    constructor(private readonly jokesRepository: JokesRepository) {}

    async execute(): Promise<ActionResult> {
        const response = await this.jokesRepository.findJokesRandom()
        const result: ActionResult = new ActionResult()
        result.variables = {jokes: response.data.value}

        return result
      }
    
}