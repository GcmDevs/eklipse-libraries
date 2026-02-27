import { RouterModule } from '@angular/router';
import {
  ViewEncapsulation,
  EventEmitter,
  ElementRef,
  Component,
  Output,
  signal,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TopbarComponent } from './topbar/component';
import { SidebarComponent } from './sidebar/component';
import { DashboardConfig, NavModule } from './config';
import { LucideIconData } from 'lucide-angular';

@Component({
  selector: 'gcm-admin-layout',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, RouterModule],
  templateUrl: './component.html',
  styleUrl: './component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  @Input({ required: true }) config!: DashboardConfig;
  @Input({ required: true }) modules!: NavModule[];
  @Input({ required: true }) iconMap!: Record<string, LucideIconData>;

  @Output() logout = new EventEmitter<void>();

  @Input({ required: false }) sidebarOpen = signal(false);

  constructor(href: ElementRef<HTMLElement>) {
    href.nativeElement.classList.add('admin-layout');
  }

  openSidebar(): void {
    this.sidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
