import { TestBed } from '@angular/core/testing';

import { FuncaoUsuarioService } from './funcao-usuario.service';

describe('FuncaoUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncaoUsuarioService = TestBed.get(FuncaoUsuarioService);
    expect(service).toBeTruthy();
  });
});
