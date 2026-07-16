import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';

import { ControlPanelModalComponent } from './control-panel-modal.component';

describe('ControlPanelModalComponent', () => {
  let component: ControlPanelModalComponent;
  let fixture: ComponentFixture<ControlPanelModalComponent>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    modalControllerSpy.dismiss.and.returnValue(Promise.resolve(true));

    TestBed.configureTestingModule({
      declarations: [ControlPanelModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial intensity is copied from initialIntensity', () => {
    component.initialIntensity = 75;
    component.ngOnInit();
    expect(component.intensity).toBe(75);
  });

  it('initial enabled state is copied from initialEnabled', () => {
    component.initialEnabled = false;
    component.ngOnInit();
    expect(component.enabled).toBe(false);
  });

  it('onIntensityChange updates intensity', () => {
    component.onIntensityChange(80);
    expect(component.intensity).toBe(80);
  });

  it('close() dismisses with cancel role', async () => {
    await component.close();
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith(null, 'cancel');
  });

  it('cancel() dismisses with cancel role', async () => {
    await component.cancel();
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith(null, 'cancel');
  });

  it('apply() dismisses with confirm role', async () => {
    await component.apply();
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith(
      jasmine.any(Object),
      'confirm'
    );
  });

  it('apply() returns current intensity and enabled state', async () => {
    component.intensity = 80;
    component.enabled = false;
    await component.apply();
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith(
      { intensity: 80, enabled: false },
      'confirm'
    );
  });

  it('knob receives the current intensity', () => {
    component.intensity = 75;
    fixture.detectChanges();
    const knobEl: HTMLElement = fixture.nativeElement.querySelector('app-control-knob');
    expect((knobEl as any).value).toBe(75);
  });

  it('knob is disabled when output is disabled', () => {
    component.enabled = false;
    fixture.detectChanges();
    const knobEl: HTMLElement = fixture.nativeElement.querySelector('app-control-knob');
    expect((knobEl as any).disabled).toBe(true);
  });
});
