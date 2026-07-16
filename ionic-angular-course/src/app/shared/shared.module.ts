import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ControlKnobComponent } from './components/control-knob/control-knob.component';
import { ControlPanelModalComponent } from './components/control-panel-modal/control-panel-modal.component';

@NgModule({
  declarations: [ControlKnobComponent, ControlPanelModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [ControlKnobComponent, ControlPanelModalComponent],
  entryComponents: [ControlPanelModalComponent]
})
export class SharedModule {}
