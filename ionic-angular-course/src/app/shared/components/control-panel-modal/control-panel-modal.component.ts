import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-control-panel-modal',
  templateUrl: './control-panel-modal.component.html',
  styleUrls: ['./control-panel-modal.component.scss']
})
export class ControlPanelModalComponent implements OnInit {
  @Input() initialIntensity = 50;
  @Input() initialEnabled = true;

  intensity = 50;
  enabled = true;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.intensity = this.initialIntensity;
    this.enabled = this.initialEnabled;
  }

  onIntensityChange(value: number): void {
    this.intensity = value;
  }

  close(): Promise<boolean> {
    return this.modalController.dismiss(null, 'cancel');
  }

  cancel(): Promise<boolean> {
    return this.modalController.dismiss(null, 'cancel');
  }

  apply(): Promise<boolean> {
    return this.modalController.dismiss(
      { intensity: this.intensity, enabled: this.enabled },
      'confirm'
    );
  }
}
