import { NavModule } from '@eklipse/ng-layouts/admin';

export const SEGURIDAD_SNAV_ITEMS: NavModule[] = [
  {
    id: 'seguridad',
    label: 'Seguridad',
    icon: 'shield-check',
    accent: 'amber',
    description: 'Autenticación, permisos, auditoría y control de acceso al sistema.',
    authorities: ['admin', 'seguridad'],
    submodules: [
      {
        id: 'permisos',
        label: 'Permisos',
        icon: 'lock',
        accent: 'purple',
        description: 'Gestión de módulos, roles y permisos de usuarios.',
        authorities: ['admin', 'seguridad-permisos'],
        routes: [
          {
            id: 'create',
            label: 'Crear permisos',
            icon: 'layers',
            description: 'Definir la estructura de módulos y sus permisos asociados.',
            href: 'seguridad/permisos/create',
            authorities: ['admin', 'seguridad-permisos-create'],
            wasDisabled: false,
          },
          {
            id: 'manage-by-usuario',
            label: 'Gestionar permisos por usuario',
            icon: 'user-cog',
            description: 'Asignar y revocar permisos individuales por usuario.',
            href: 'seguridad/permisos/manage-by-usuario',
            authorities: ['admin', 'seguridad-permisos-manage-by-usuario'],
            wasDisabled: true,
          },
          {
            id: 'manage-by-rol',
            label: 'Gestionar permisos por rol',
            icon: 'users',
            description: 'Administrar permisos agrupados por rol.',
            href: 'seguridad/permisos/manage-by-rol',
            authorities: ['admin', 'seguridad-permisos-manage-by-rol'],
          },
        ],
      },
    ],
  },
];
