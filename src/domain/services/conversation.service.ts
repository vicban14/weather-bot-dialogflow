import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { ConversationOutputDto } from '../../data/models/conversation.dtos';
import { FullfilmentService } from './fullfilment.service';

@Injectable()
export class ConversationService {

  constructor(
    private readonly mapperService: MapperService,
    private readonly fullfilmentService: FullfilmentService
    ) {}


  async conversationWebhook(dialogflowData: any) {
    const fullfilment = await this.mapperService.mapEvent(dialogflowData);
    let conversationOutputDto: ConversationOutputDto = null;

    conversationOutputDto = await this.fullfilmentService.process(fullfilment);
    return conversationOutputDto.text

  }
}