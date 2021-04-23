import { TestBed } from '@angular/core/testing';

import { ResearchGroupService } from './research-group.service';

describe('ResearchGroupService', () => {
  let service: ResearchGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
