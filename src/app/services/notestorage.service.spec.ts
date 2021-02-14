import { TestBed } from '@angular/core/testing';

import { NotestorageService } from './notestorage.service';

describe('NotestorageService', () => {
  let service: NotestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
