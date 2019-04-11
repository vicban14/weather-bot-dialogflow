import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { WeatherRepository } from './data/weather.repository';
import { ConversationService } from './services/conversation.service';
import { WeatherService } from './services/weather.service';
import { TemplateProcessorService } from './services/template-processor.service'

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [WeatherService, ConversationService, WeatherRepository, TemplateProcessorService],
})
export class AppModule {}
