import { View } from "./view";
import { Event } from "./events";


export class ActionResult {
  error?: string;
  variables?: any;
  view?: View;
  event?: Event;
  skipStoreEvent?: boolean;
  action
}