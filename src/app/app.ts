import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayoutComponent, DashboardConfig } from '@eklipse/ng-layouts/admin';
import { NAV_MODULES } from './modules';
import { Layers, LucideIconData, ShieldCheck, Lock } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('eklipse-utilities');

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

  modules = NAV_MODULES;

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
