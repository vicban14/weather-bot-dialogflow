import { Injectable } from "@nestjs/common";
import { TemplateProcessorService } from "./template-processor.service";
import { ConversationOutputDto } from "src/data/models/conversation.dtos";
import { Fullfilment } from "../../data/models/fullfilment";
import { View } from "../../data/models/view";
import { Event } from "../../data/models/event";
import { ActionResolverService } from "./action-resolver.service";



@Injectable()
export class FullfilmentService {
    constructor(private readonly templateProcessorService: TemplateProcessorService, private readonly actionResolverService: ActionResolverService) { }

    async process(fullfilment: Fullfilment): Promise<ConversationOutputDto> {
        const templateParams = [];
        let view: View = null;
        let event: Event = null;
        let fullfilmentText = fullfilment.fulfillmentText

        const actionReady = fullfilment.action && fullfilment.allRequiredParamsPresent && !fullfilment.eventProcessed;

        if (actionReady) {
            const action = this.actionResolverService.resolve(fullfilment.action);
            const actionResult = await action.execute(fullfilment.parameters);


            if (actionResult.variables) {
                templateParams.push(actionResult.variables);
            }

            view = actionResult.view;
            event = actionResult.event;

            if (actionResult.error) {
                fullfilmentText = actionResult.error;
                fullfilment.speech = actionResult.error;
            }
        }
        return {
            text: this.templateProcessorService.process(fullfilmentText, ...templateParams),
            speech: this.templateProcessorService.process(fullfilment.speech, ...templateParams),
            event: event,
            data: view,
            action: actionReady ? fullfilment.action : undefined
        };
    }
}