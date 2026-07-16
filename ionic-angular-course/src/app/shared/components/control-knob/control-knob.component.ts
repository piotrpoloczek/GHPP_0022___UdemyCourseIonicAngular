import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-control-knob',
  templateUrl: './control-knob.component.html',
  styleUrls: ['./control-knob.component.scss']
})
export class ControlKnobComponent implements OnChanges {
  @Input() label = 'Intensity';
  @Input() unit = '%';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 50;
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<number>();

  private isDragging = false;
  private dragStartY = 0;
  private dragStartValue = 0;

  get rotation(): number {
    const lo = this.safeMin;
    const hi = this.safeMax;
    if (hi <= lo) { return -135; }
    const ratio = (this.value - lo) / (hi - lo);
    return -135 + ratio * 270;
  }

  get displayValue(): string {
    return isFinite(this.value) ? String(this.value) : '0';
  }

  private get safeMin(): number {
    return isFinite(this.min) ? this.min : 0;
  }

  private get safeMax(): number {
    const m = isFinite(this.max) ? this.max : 100;
    return m > this.safeMin ? m : this.safeMin + 100;
  }

  private get safeStep(): number {
    return isFinite(this.step) && this.step > 0 ? this.step : 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      const clamped = this.clamp(this.roundToStep(changes.value.currentValue));
      if (clamped !== this.value) {
        this.value = clamped;
      }
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (this.disabled) { return; }
    this.isDragging = true;
    this.dragStartY = event.clientY;
    this.dragStartValue = this.value;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging || this.disabled) { return; }
    const delta = this.dragStartY - event.clientY;
    const range = this.safeMax - this.safeMin;
    const pixelsForFullRange = 200;
    const newValue = this.dragStartValue + (delta / pixelsForFullRange) * range;
    this.setValue(newValue);
  }

  onPointerUp(): void {
    this.isDragging = false;
  }

  onPointerCancel(): void {
    this.isDragging = false;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) { return; }
    let handled = false;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        this.setValue(this.value + this.safeStep);
        handled = true;
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        this.setValue(this.value - this.safeStep);
        handled = true;
        break;
      case 'Home':
        this.setValue(this.safeMin);
        handled = true;
        break;
      case 'End':
        this.setValue(this.safeMax);
        handled = true;
        break;
      default:
        break;
    }
    if (handled) {
      event.preventDefault();
    }
  }

  decrease(): void {
    if (!this.disabled) {
      this.setValue(this.value - this.safeStep);
    }
  }

  increase(): void {
    if (!this.disabled) {
      this.setValue(this.value + this.safeStep);
    }
  }

  private setValue(raw: number): void {
    const clamped = this.clamp(this.roundToStep(raw));
    if (clamped !== this.value) {
      this.value = clamped;
      this.valueChange.emit(this.value);
    }
  }

  private clamp(val: number): number {
    return Math.min(this.safeMax, Math.max(this.safeMin, val));
  }

  private roundToStep(val: number): number {
    return Math.round((val - this.safeMin) / this.safeStep) * this.safeStep + this.safeMin;
  }
}
