import { ActionResult } from './action-result';

export interface Action {
    execute(session: any, params: any): Promise<ActionResult>;
}