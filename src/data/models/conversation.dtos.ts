import { View } from './view';
import { Event } from './event';

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