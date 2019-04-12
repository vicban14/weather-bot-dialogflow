import { Injectable, Logger } from '@nestjs/common';
import * as ObjectPath from 'object-path';

@Injectable()
export class TemplateProcessorService {

  constructor() { }

  process(textTemplate: string, ...contexts: any[]): string {
    if (!textTemplate) {
      return textTemplate;
    }
    return textTemplate.replace(/\%[\w\._]+\%/g, function (key) {
      const variablePath = key.substring(1, key.length - 1);
      let value = '';
      let found = false;

      contexts.forEach((context) => {

        if (ObjectPath.has(context, variablePath)) {
          value = ObjectPath.get(context, variablePath);
          found = true;
          return;
        }
      });
      return value;
    });
  }
}
