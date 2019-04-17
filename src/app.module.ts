import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { WeatherRepository } from './data/weather.repository';
import { ConversationService } from './domain/services/conversation.service';
import { WeatherAction } from './domain/services/action/weather.action';
import { TemplateProcessorService } from './domain/services/template-processor.service'
import { MapperService } from './domain/services/mapper.service';
import { ActionResolverService } from './domain/services/action-resolver.service';
import { ConversationOutputDto } from './data/models/conversation.dtos';
import { FullfilmentService } from './domain/services/fullfilment.service';
import { DoNothingAction } from './domain/services/action/do-nothing.action';
import { JokesAction } from './domain/services/action/jokes.action';
import { JokesRepository } from './data/jokes.respository';


@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [WeatherAction, 
    ConversationService, 
    WeatherRepository, 
    TemplateProcessorService, 
    MapperService, 
    ActionResolverService, 
    ConversationOutputDto,
    DoNothingAction,
    FullfilmentService,
    JokesAction,
    JokesRepository],
})
export class AppModule {}
