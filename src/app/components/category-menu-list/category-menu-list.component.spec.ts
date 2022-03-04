import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMenuListComponent } from './category-menu-list.component';

describe('CategoryMenuListComponent', () => {
  let component: CategoryMenuListComponent;
  let fixture: ComponentFixture<CategoryMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
