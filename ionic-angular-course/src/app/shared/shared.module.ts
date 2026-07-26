import { NgModule } from "@angular/core";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { LocationPickerComponent } from "./pickers/location-picker/location-picker.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ImagePickerComponent } from "./pickers/image-picker/image-picker.component";

@NgModule({
    declarations: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
    exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
    imports: [CommonModule, IonicModule],
    entryComponents: [MapModalComponent],
    providers: []
})

export class SharedModule {}