export type CtmSnavItemType = 'link' | 'collection' | 'dropdown';

export interface CtmSnavItems {
  type: CtmSnavItemType;
  icon?: string;
  iconType?: 'material' | 'img' | 'lucide';
  imgIconVisibility?: string;
  imgIconVisibilityOff?: string;
  imgIconRadioButton?: string;
  name: string;
  url?: string;
  urlIsNotAutoCompleted?: boolean;
  dropdownLinks?: CtmSnavDropdownLink[];
  objects?: CtmSnavItems[];
  authorities?: string[];
  disableOnContexts?: any[];
  showCollectionContent?: boolean;
  forceDisabledContent?: boolean;
  isOpened?: boolean;
  notAddAdminAuthority?: boolean;
}

export interface CtmSnavDropdownLink {
  name: string;
  url: string;
  urlIsNotAutoCompleted?: boolean;
  authorities?: string[];
  disableOnContexts?: any[];
  forceDisabledContent?: boolean;
  notAddAdminAuthority?: boolean;
}

export interface AdminLayoutConfig {
  showHeader?: boolean;
  showSidebarDarkModeBtn?: boolean;
  userImage?: string;
  userName?: string;
  appIcon: string;
  appTitle: string;
  appSidebarTitle: string;
  appSidebarSubtitle: string;
  navigation: CtmSnavItems[];
  authorities: string[];
  adminAuthority?: string;
  context: any;
  isDinamicSidebar: boolean;
  sidebarDebounceTime: number;
  accordionInCollections: boolean;
  disableHiddenCollections: boolean;
  hasFooter: boolean;
  includeBreadcrumbs: boolean;
}
