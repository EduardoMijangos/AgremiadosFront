import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAgremiadoPage } from './panel-agremiado.page';

describe('PanelAgremiadoPage', () => {
  let component: PanelAgremiadoPage;
  let fixture: ComponentFixture<PanelAgremiadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PanelAgremiadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
