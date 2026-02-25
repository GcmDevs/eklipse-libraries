import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'tak-table-no-records',
  template: `
    @if (isLoading) {
      <div class="tak-progress-circle__container">
        <mat-progress-spinner mode="indeterminate" />
      </div>
    } @else {
      <div class="tak-progress-circle__container">
        <div class="empty-state">
          <svg
            class="empty-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p class="empty-title">Sin resultados</p>
          <p class="empty-description">
            @if (secondImage) {
              No hay resultados que contengan esta palabra clave
            } @else {
              No se encontraron resultados
            }
          </p>
        </div>
      </div>
    }
  `,
  styles: `
    .tak-progress-circle__container {
      min-height: calc(100vh - 300px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media only screen and (min-width: 640px) {
      .tak-progress-circle__container {
        min-height: calc(100vh - 300px);
      }
    }
    .tak-progress-circle__container {
      min-height: calc(100vh - 300px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tak-progress-circle__container-image {
      min-height: calc(100vh - 300px);
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      color: var(--text-secondary);
    }

    .empty-icon {
      margin-bottom: 16px;
      opacity: 0.4;
    }

    .empty-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .empty-description {
      font-size: 14px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakTableNoRecordsComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;

  @Input() isLoading = false;

  private _secondImage = true;

  public ngOnInit(): void {
    if (this.dataSource) {
      if (this.dataSource.data.length && !this.dataSource.filteredData.length)
        this._secondImage = false;
    }
  }

  get secondImage(): boolean {
    return this._secondImage;
  }
}
