import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'tak-pretty-box',
  templateUrl: './component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakPrettyBoxComponent implements AfterViewInit {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('scroll') scroll!: ElementRef;

  @Input() calcHeight: string | number = 94;
  @Input() headerHeightPx: number = 0;
  @Input() footerHeightPx: number = 0;
  @Input() encapsulated = true;

  private _hasHeader = false;
  private _hasFooter = false;
  private _substractFromHeight = 0;

  constructor(private _cd: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this._config();
    }, 100);
    setTimeout(() => {
      this._config();
    }, 2000);
  }

  public scrollTop(): void {
    if (this.scroll) this.scroll.nativeElement.scrollTo({ top: 0 });
  }

  private _config(): void {
    const header = this.header.nativeElement.querySelector('[tak-pretty-box-header]');
    const footer = this.footer.nativeElement.querySelector('[tak-pretty-box-footer]');

    this._hasHeader = header ? true : false;
    this._hasFooter = footer ? true : false;

    if (typeof this.calcHeight === 'number') {
      const refreshInterval = setInterval(() => {
        if (this._substractFromHeight === 0) {
          const headerHeight = this._hasHeader
            ? !this.headerHeightPx
              ? this.header.nativeElement.offsetHeight
              : this.headerHeightPx
            : 0;

          const footerHeight = this._hasFooter
            ? !this.footerHeightPx
              ? this.footer.nativeElement.offsetHeight
              : this.footerHeightPx
            : 0;

          this._substractFromHeight = +this.calcHeight + headerHeight + footerHeight;
        } else {
          clearInterval(refreshInterval);
          this._cd.markForCheck();
        }
      }, 10);
    }

    if (!this._hasHeader) this.scroll.nativeElement.classList.add('tak-pretty-box-border-top');
    if (!this._hasFooter) this.scroll.nativeElement.classList.add('tak-pretty-box-border-bottom');

    this._cd.markForCheck();
  }

  get minHeightFt(): string {
    if (typeof this.calcHeight === 'number') return `calc(100vh - ${this._substractFromHeight}px)`;
    else return this.calcHeight;
  }

  get hasHeader(): boolean {
    return this._hasHeader;
  }

  get hasFooter(): boolean {
    return this._hasFooter;
  }
}
