import { Injectable } from '@nestjs/common';
import { Action } from 'src/data/models/action';
import { ActionResult } from 'src/data/models/action-result';

@Injectable()
export class DoNothingAction implements Action {
    constructor() { }
    async execute():Promise<ActionResult> {
      return {
        skipStoreEvent: true
      };
    }
    
}