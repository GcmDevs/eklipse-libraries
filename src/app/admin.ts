import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardConfig } from '@eklipse/ng-layouts/admin';
import { SEGURIDAD_SNAV_ITEMS } from './modules';
import { Layers, LucideIconData, ShieldCheck, Lock } from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet],
  template: `
    @if (resourcesLoaded()) {
      <router-outlet />
    }
  `,
})
export class AdminDashboardComponent implements OnInit {
  resourcesLoaded = signal(false);

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

  iconMap: Record<string, LucideIconData> = {
    'shield-check': ShieldCheck,
    lock: Lock,
    layers: Layers,
  };

  ngOnInit(): void {
    this.resourcesLoaded.set(true);
  }

  clickOnLogout(): void {
    console.log('Logout clicked');
  }
}
