import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlKnobComponent } from './control-knob.component';

describe('ControlKnobComponent', () => {
  let component: ControlKnobComponent;
  let fixture: ComponentFixture<ControlKnobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlKnobComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlKnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default value of 50', () => {
    expect(component.value).toBe(50);
  });

  it('should increase value by one step', () => {
    component.value = 50;
    component.increase();
    expect(component.value).toBe(51);
  });

  it('should decrease value by one step', () => {
    component.value = 50;
    component.decrease();
    expect(component.value).toBe(49);
  });

  it('should not exceed max', () => {
    component.value = 100;
    component.increase();
    expect(component.value).toBe(100);
  });

  it('should not go below min', () => {
    component.value = 0;
    component.decrease();
    expect(component.value).toBe(0);
  });

  it('should emit valueChange after a value change', () => {
    spyOn(component.valueChange, 'emit');
    component.value = 50;
    component.increase();
    expect(component.valueChange.emit).toHaveBeenCalledWith(51);
  });

  it('rotation is -135 degrees at minimum', () => {
    component.value = component.min;
    expect(component.rotation).toBe(-135);
  });

  it('rotation is 135 degrees at maximum', () => {
    component.value = component.max;
    expect(component.rotation).toBe(135);
  });

  it('ArrowUp key increases value by one step', () => {
    component.value = 50;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.value).toBe(51);
  });

  it('ArrowDown key decreases value by one step', () => {
    component.value = 50;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.value).toBe(49);
  });

  it('Home key sets minimum value', () => {
    component.value = 50;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(component.value).toBe(component.min);
  });

  it('End key sets maximum value', () => {
    component.value = 50;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
    expect(component.value).toBe(component.max);
  });

  it('disabled state prevents increase, decrease and keyboard changes', () => {
    component.disabled = true;
    component.value = 50;
    component.increase();
    expect(component.value).toBe(50);
    component.decrease();
    expect(component.value).toBe(50);
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.value).toBe(50);
  });
});
