import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-gemi-page--web',
  template: '',
  styles: `
    .force-display {
      display: block !important;
    }
    main.gemi-main {
      padding: 0px !important;
      max-width: 9999px !important;
    }
    .iframe-local-cb {
      border: none;
    }
    @media only screen and (max-width: 640px) {
      .iframe-local-cb {
        height: calc(100vh - 133px);
      }
    }
    @media only screen and (min-width: 641px) {
      .iframe-local-cb {
        height: calc(100vh - 70px);
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GemiComponent implements AfterViewInit, OnDestroy {
  isLoading = signal(false);

  ngAfterViewInit(): void {
    document.getElementsByTagName('main')[0].classList.add('gemi-main');
    document.getElementsByTagName('body')[0].classList.add('gemi-body');

    setTimeout(() => {
      this.isLoading.set(true);
    }, 500);
  }
  ngOnDestroy(): void {
    document.getElementsByTagName('main')[0].classList.remove('gemi-main');
    document.getElementsByTagName('body')[0].classList.remove('gemi-body');
  }
}
