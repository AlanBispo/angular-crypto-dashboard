import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoCarteira } from './resumo-carteira';

describe('ResumoCarteira', () => {
  let component: ResumoCarteira;
  let fixture: ComponentFixture<ResumoCarteira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoCarteira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoCarteira);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
