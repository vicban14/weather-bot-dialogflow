import { Event } from "./events";
import { View } from "./view";


export class ConversationInputDto {
    text: string;
  }
  
  export class ConversationOutputDto {
    text: string;
    speech: string;
    event: Event;
    data: View;
    action?: string;
  }