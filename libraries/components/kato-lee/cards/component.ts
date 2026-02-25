import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  standalone:true,
  selector: 'tak-simple-card',
  template: `
    @if (hasTopLine) {
      <div
        class="tak-simple-card--topline {{ topLineClass }}"
        [style.background]="topLineColor"
      ></div>
    }
    <div class="tak-simple-card" [class.no-card-topline]="!hasTopLine">
      <ng-content/>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakSimpleCardComponent {
  @Input() hasTopLine: boolean = true;
  @Input() topLineClass: string = '';
  @Input() topLineColor: string = '';
}
