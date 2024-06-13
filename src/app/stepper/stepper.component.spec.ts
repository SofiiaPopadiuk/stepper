import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';
import { StepConfig } from './models/stepper.interfaces';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentStep to steps.length if currentStep is greater than number of steps', () => {
    const steps: StepConfig[] = [{label: '1'}, {label: '2'}, {label: '3'}];
    component.steps = steps;
    component.currentStep = 5;
    component.ngOnInit();
    expect(component.currentStep).toEqual(steps.length);
  });

  describe('isStepActive', () => {
    it('should check if step is active (success flow)', () => {
      component.currentStep = 2;
      const result = component.isStepActive(2, 2);
      expect(result).toBeTrue();
    });

    it('should check if step is active (unsuccess flow)', () => {
      component.currentStep = 2;
      const result = component.isStepActive(2, 1);
      expect(result).toBeFalse();
    });
  })

  describe('isPassedStep', () => {
    it('should check if step is passed (success flow)', () => {
      component.currentStep = 3;
      const result = component.isPassedStep(1, 2);
      expect(result).toBeTrue();
    });

    it('should check if step is passed (unsuccess flow)', () => {
      component.currentStep = 2;
      const result = component.isPassedStep(1, 3);
      expect(result).toBeFalse();
    });
  })

  describe('getStepIcon', () => {
    it('should return a checkmark when step is passed', () => {
      component.currentStep = 3;
      const result = component.getStepIcon(1, 2);
      expect(result).toEqual('✓');
    });
  
    it('should return step index + 1 when step is not passed and is not active', () => {
      component.currentStep = 2;
      const result = component.getStepIcon(2, 3);
      expect(result).toEqual('3');
    });
  })

  describe('isUnselectedStep', () => {
    it('should return true if the step is unselected', () => {
      component.unselectedRow = 1;
      const result = component.isUnselectedStep(1, 1);
      expect(result).toBeTrue();
    });

    it('should return false if the step is not unselected', () => {
      component.unselectedRow = 2;
      const result = component.isUnselectedStep(1, 1);
      expect(result).toBeFalse();
    });
  });

  describe('getAnimationDelay', () => {
    it('should return the correct animation delay for unselected step', () => {
      component.unselectedRow = 2;
      const result = component.getAnimationDelay(1, 2);
      expect(result).toBe('1s');
    });

    it('should return the correct animation delay for selected step', () => {
      component.unselectedRow = 2;
      const result = component.getAnimationDelay(1, 1);
      expect(result).toBe('1s');
    });
  });

  describe('ngOnChanges', () => {
    it('should set unselectedRow to null when currentStep is changed', () => {
      const changes: SimpleChanges = {
        currentStep: new SimpleChange(0, 1, false)
      };
      component.ngOnChanges(changes);
      expect(component.unselectedRow).toBeNull();
    });

    it('should set unselectedRow to previousValue if currentStep decreases', () => {
      const changes: SimpleChanges = {
        currentStep: new SimpleChange(2, 1, false)
      };
      component.ngOnChanges(changes);
      expect(component.unselectedRow).toBe(2);
    });

    it('should not set unselectedRow to previousValue if currentStep increases', () => {
      const changes: SimpleChanges = {
        currentStep: new SimpleChange(1, 2, false)
      };
      component.ngOnChanges(changes);
      expect(component.unselectedRow).toBeNull();
    });
  });
});
