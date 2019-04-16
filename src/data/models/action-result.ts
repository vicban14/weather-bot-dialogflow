import { View } from "./view";
import { Event } from "./event";


export class ActionResult {
  error?: string;
  variables?: any;
  view?: View
  event?: Event;
  skipStoreEvent?: boolean;
}
