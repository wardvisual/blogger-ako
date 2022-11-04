import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'marked',
})
export class MarkdownPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    if (value && value.length > 0) {
      // return marked.parse(value);
    }
    return value;
  }
}
