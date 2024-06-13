import { Component, Input } from '@angular/core';
import { Direction } from '../stepper/models/stepper.enum';
import { StepConfig } from '../stepper/models/stepper.interfaces';

@Component({
  selector: 'app-stepper',
  template: ''
})
export class MockStepperComponent {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep: number = 0;
  @Input() direction: Direction = Direction.Horizontal;
  @Input() color: string = '#22ECE9';
}
