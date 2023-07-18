import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService]
    });
  
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make API request with valid token', () => {
    const dummyResponse = { ... }; // Defina um objeto de resposta válido

    service.login('username', 'password').subscribe(() => {
      service.getMarcaList().subscribe(response => {
        expect(response).toEqual(dummyResponse); // Verifica se a resposta é igual ao objeto esperado
      });

      const req = httpMock.expectOne(`${service.APIUrl}/token/`);
      expect(req.request.method).toBe('POST');
      req.flush({ access_token: 'valid_token' });
    });

    const reqAuth = httpMock.expectOne(`${service.APIUrl}/marca/`);
    expect(reqAuth.request.headers.get('Authorization')).toBe('Bearer valid_token');
    expect(reqAuth.request.method).toBe('GET');
    reqAuth.flush(dummyResponse);
  });

  it('should handle API request with invalid token', () => {
    service.login('username', 'password').subscribe(() => {
      service.getMarcaList().subscribe(
        response => {
          fail('Request should have failed'); // A requisição deve falhar neste caso
        },
        error => {
          expect(error.status).toBe(401); // Verifica se o status da resposta é 401 Unauthorized
        }
      );

      const req = httpMock.expectOne(`${service.APIUrl}/token/`);
      expect(req.request.method).toBe('POST');
      req.flush({ access_token: 'invalid_token' });
    });

    const reqAuth = httpMock.expectOne(`${service.APIUrl}/marca/`);
    expect(reqAuth.request.headers.get('Authorization')).toBe('Bearer invalid_token');
    expect(reqAuth.request.method).toBe('GET');
    reqAuth.flush(null, { status: 401, statusText: 'Unauthorized' });
  });
});
