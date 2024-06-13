import { Component } from '@angular/core';
import { Direction } from './stepper/models/stepper.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  direction = Direction.Horizontal;
  color = '#22ECE9';
  steps = [{ label: 'Role' }, { label: 'Email' }, { label: 'Setting' }];
  currentStep = 0;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
