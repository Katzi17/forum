import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showMoreLess',
})
export class ShowMorePipe implements PipeTransform {
  maxLenght = 1000;
  showMore = false;

  transform(value: string, isShowMore: boolean): string {
    this.showMore = isShowMore;
    return this.showMore ? value : `${value.slice(0, this.maxLenght)}...`;
  }
}
