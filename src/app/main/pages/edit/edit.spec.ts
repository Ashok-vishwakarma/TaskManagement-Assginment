import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit } from './edit';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerData } from '../../../services/customer-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('Edit', () => {
  let component: Edit;
  let fixture: ComponentFixture<Edit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edit],
      providers:[ {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '123' } },
            params: { subscribe: (fn: any) => fn({ id: '123' }) }
          }
        },provideZonelessChangeDetection(),provideHttpClientTesting(),   provideHttpClient(withInterceptorsFromDi()),CustomerData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Edit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
