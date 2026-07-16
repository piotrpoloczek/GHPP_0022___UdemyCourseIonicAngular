import { Component } from '@angular/core';

import { MenuController, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { ControlPanelModalComponent } from './shared/components/control-panel-modal/control-panel-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  intensity = 50;
  controlEnabled = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  async openControlPanel(): Promise<void> {
    await this.menuController.close('m1');

    const modal = await this.modalController.create({
      component: ControlPanelModalComponent,
      cssClass: 'control-panel-card-modal',
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      componentProps: {
        initialIntensity: this.intensity,
        initialEnabled: this.controlEnabled
      }
    });

    await modal.present();

    const result = await modal.onDidDismiss();

    if (result.role !== 'confirm' || !result.data) {
      return;
    }

    const data = result.data as { intensity: number; enabled: boolean };
    this.intensity = data.intensity;
    this.controlEnabled = data.enabled;
    // Future integration point:
    // send the confirmed settings to a BLE or device-control service.
    // e.g., this.deviceControlService.apply(this.intensity, this.controlEnabled);
  }
}
