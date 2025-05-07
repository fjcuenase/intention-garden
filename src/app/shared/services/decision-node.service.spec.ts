import { TestBed } from '@angular/core/testing';

import { DecisionNodeService } from './decision-node.service';

describe('DecisionNodeService', () => {
  let service: DecisionNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisionNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
