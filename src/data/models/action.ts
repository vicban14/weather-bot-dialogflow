import { ActionResult } from './action-result';

export interface Action {
    execute(paramaters: any): Promise<ActionResult>;
}
