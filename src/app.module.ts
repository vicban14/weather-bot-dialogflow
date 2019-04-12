import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { WeatherRepository } from './data/weather.repository';
import { ConversationService } from './domain/services/conversation.service';
import { WeatherService } from './domain/services/weather.service';
import { TemplateProcessorService } from './domain/services/template-processor.service'

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [WeatherService, ConversationService, WeatherRepository, TemplateProcessorService],
})
export class AppModule {}
