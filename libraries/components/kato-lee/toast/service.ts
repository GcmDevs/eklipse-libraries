import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export type TakToastType = 'notification' | 'danger' | 'success';

export interface TakToastConfig {
  hasDissmissButton?: boolean;
  dissmissButtonMessage?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class TakToast {
  constructor(private _snackBar: MatSnackBar) {}

  public notification(message: string, payload: TakToastConfig = {}): void {
    this._generateTakToast(message, 'notification', this._managePayload(payload));
  }

  public success(message: string, payload: TakToastConfig = {}): void {
    this._generateTakToast(message, 'success', this._managePayload(payload));
  }
  public danger(message: string, payload: TakToastConfig = {}): void {
    this._generateTakToast(message, 'danger', this._managePayload(payload));
  }

  private _generateTakToast(message: string, type: TakToastType, payload: TakToastConfig) {
    const {
      duration,
      verticalPosition,
      horizontalPosition,
      hasDissmissButton,
      dissmissButtonMessage,
    } = payload;

    this._snackBar.open(message, `${hasDissmissButton ? dissmissButtonMessage : ''}`, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass: `tak-snackbar-${type}`,
    });
  }

  private _managePayload(payload: TakToastConfig): TakToastConfig {
    return {
      hasDissmissButton: payload.hasDissmissButton || true,
      duration: payload.duration || 5000,
      dissmissButtonMessage: payload.dissmissButtonMessage || 'Cerrar',
      horizontalPosition: payload.horizontalPosition || 'center',
      verticalPosition: payload.verticalPosition || 'bottom',
    };
  }
}
