import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideZonelessChangeDetection } from '@angular/core';

describe('App', () => {
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);


    fixture.detectChanges();
  });

  // it('should render title', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const h1 = compiled.querySelector('h1');

  //   expect(h1).toBeTruthy();
  //   expect(h1!.textContent).toContain('Ultrasafe_assignment');
  // });

  it('should contain RouterOutlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
