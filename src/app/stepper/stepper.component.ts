import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Direction } from './models/stepper.enum';
import { StepConfig } from './models/stepper.interfaces';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent implements OnInit, OnChanges {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep: number = 0;
  @Input() direction: Direction = Direction.Horizontal;
  @Input() color: string = '#22ECE9';

  unselectedRow: any;

  constructor() {}

  ngOnInit(): void {
    if (this.currentStep >= this.steps.length) {
      this.currentStep = this.steps.length;
    }
    document.documentElement.style.setProperty('--active', this.color);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentStep = changes['currentStep'];
    if (currentStep) {
      this.unselectedRow = null;
    }
    if (currentStep.previousValue > currentStep.currentValue) {
      this.unselectedRow = currentStep.previousValue;
    }
  }  

  isStepActive(stepIndex: number, rowIndex: number): boolean {
    return (
      (this.currentStep === stepIndex && this.currentStep === rowIndex) ||
      (stepIndex < this.currentStep && rowIndex === stepIndex)
    );
  }

  isPassedStep(stepIndex: number, rowIndex: number): boolean {
    return (
      (rowIndex <= this.currentStep && stepIndex < this.currentStep && stepIndex < rowIndex)
    );
  }

  getStepIcon(stepIndex: number, rowIndex: number): string {
    return this.isPassedStep(stepIndex, rowIndex) ? '✓' : `${stepIndex + 1}`;
  }

  isUnselectedStep(stepIndex: number, rowIndex: number): boolean {
    return this.unselectedRow === rowIndex && stepIndex <= this.unselectedRow;
  }
  
  getAnimationDelay(stepIndex: number, rowIndex: number): string {
    return this.isUnselectedStep(stepIndex, rowIndex)
      ? rowIndex - stepIndex + 's'
      : stepIndex + 's';
  }  
}
