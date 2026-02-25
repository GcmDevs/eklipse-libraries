import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { DashboardConfig, TasksGridComponent } from '@eklipse/ng-layouts/admin';
import { ICON_MAP } from '../../icon-map';
import { SEGURIDAD_SNAV_ITEMS } from '../../modules';

@Component({
  selector: 'app-home-page',
  templateUrl: './page.html',
  styleUrls: ['./page.scss'],
  imports: [TasksGridComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page {
  iconMap = ICON_MAP;

  config: DashboardConfig = {
    icon: 'favicon.ico',
    enterpriseName: 'LOREM',
    contextCode: 'IPSUM',
    contextForHumans: 'IPSUM_FOR_HUMANS',
    userFullName: 'ENRIQUE JOSE DE ARMAS OSIA',
    userFirstName: 'ENRIQUE',
    userInitials: 'EA',
    roleName: 'Administrador',
    authorities: ['admin'],
    localhostUrl: 'http://localhost:4200',
    homeUrl: '',
  };

  modules = SEGURIDAD_SNAV_ITEMS;

  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos dias';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  });
}
