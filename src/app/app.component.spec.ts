import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStepperComponent } from './mocks/mock-components';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockStepperComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('nextStep', () => {
    it('should increment currentStep when nextStep() is called', () => {
      const initialStep = component.currentStep;
      const nextButton = fixture.debugElement.nativeElement.querySelector('.button__next');
      nextButton.click();
      fixture.detectChanges();
      expect(component.currentStep).toBe(initialStep + 1);
    });
    
    it('should not increment currentStep beyond the last step', () => {
      component.currentStep = component.steps.length - 1;
      const nextButton = fixture.debugElement.nativeElement.querySelector('.button__next');
      nextButton.click();
      fixture.detectChanges();
      expect(component.currentStep).toBe(component.steps.length - 1);
    });
  })

  describe('prevStep', () => {
    it('should decrement currentStep when prevStep() is called', () => {
      component.currentStep = 1;
      const initialStep = component.currentStep;
      const prevButton = fixture.debugElement.nativeElement.querySelector('.button__prev');
      prevButton.click();
      fixture.detectChanges();
      expect(component.currentStep).toBe(initialStep - 1);
    });
    
    it('should not decrement currentStep below 0', () => {
      const prevButton = fixture.debugElement.nativeElement.querySelector('.button__prev');
      prevButton.click();
      fixture.detectChanges();
      expect(component.currentStep).toBe(0);
    });
  })  
});
