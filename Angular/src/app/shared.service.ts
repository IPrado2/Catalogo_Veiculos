import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/notification.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000";
  
  constructor(
    private http:HttpClient, 
    private cookieService: CookieService, 
    private notifyService : NotificationService, 
    private router: Router
  ) { }
  
  // TOKEN
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.setItem('token', '');
  }
  
  
  
  // Marcas
  getMarcaById(id: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/get_marca/' + id);
  }
  
  getMarcaList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_marca/');
  }
  
  addMarca(nome: string){
    return this.http.post(this.APIUrl + '/create_marca/', { nome });
  }
  
  updateMarca(id: number, nome: string){
    return this.http.put(this.APIUrl + '/update_marca/' + id, { nome });
  }
  
  deleteMarca(id: number){
    return this.http.delete(this.APIUrl + '/delete_marca/' + id);
  }
  
  
  // Modelos
  getModeloById(id: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/get_modelo/' + id);
  }
  
  getModelosList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_modelo/');
  }
  
  addModelos(nome: string){
    return this.http.post(this.APIUrl + '/create_modelo/', { nome });
  }
  
  updateModelos(id: number, nome: string){
    return this.http.put(this.APIUrl + '/update_modelo/' + id, { nome });
  }
  
  deleteModelos(id: number){
    return this.http.delete(this.APIUrl + '/delete_modelo/' + id);
  }
  
  
  // Veiculos
  getVeiculosList(id?: number): Observable<{ veiculos: any[], tamanho: number }> {
    if (id) {
      return this.getVeiculoById(id).pipe(
        map((veiculo) => {
          return {
            veiculos: [{
              ...veiculo,
              marca: veiculo.marca?.nome || '',
              modelo: veiculo.modelo?.nome || '',
            }],
            tamanho: 1 // Tamanho da lista é 1 quando o ID é fornecido
          };
        }),
        catchError(() => of({ veiculos: [], tamanho: 0 })) // Lida com erros, caso o veículo não seja encontrado por algum motivo
      );
    } else {
      return this.http.get<any[]>(this.APIUrl + '/get_veiculo/').pipe(
        switchMap((veiculos) => {
          const veiculosWithDetails$ = veiculos.map((veiculo) => {
            const marca$ = this.getMarcaById(veiculo.marca).pipe(
              map((marca) => marca?.nome),
              catchError(() => of('')) // Lida com erros, caso a marca não seja encontrada por algum motivo
            );

            const modelo$ = this.getModeloById(veiculo.modelo).pipe(
              map((modelo) => modelo?.nome),
              catchError(() => of('')) // Lida com erros, caso o modelo não seja encontrado por algum motivo
            );

            const foto$ = veiculo.foto
              ? this.http.get(this.APIUrl + '/media/' + veiculo.foto).pipe(
                  catchError(() => of(veiculo.foto))
                )
              : of(veiculo.foto); // Se 'foto' for nulo, retorna o objeto 'veiculo.foto' sem fazer a requisição

            return forkJoin([marca$, modelo$, foto$]).pipe(
              map(([marca, modelo, foto]) => {
                const valorFormatado = parseFloat(veiculo.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                return {
                  ...veiculo,
                  marca,
                  modelo,
                  foto,
                  valor: valorFormatado
                };
              })
            );
          });

          return forkJoin(veiculosWithDetails$).pipe(
            map((veiculosList) => ({
              veiculos: veiculosList,
              tamanho: veiculosList.length // Tamanho da lista de veículos
            }))
          );
        }),
        catchError(() => of({ veiculos: [], tamanho: 0 })) // Lida com erros, caso ocorra algum erro na chamada HTTP
      );
    }
  }
  
  getVeiculosListOrder(id?: number): Observable<{ veiculos: any[], tamanho: number }> {
    if (id) {
      return this.getVeiculoById(id).pipe(
        map((veiculo) => {
          return {
            veiculos: [{
              ...veiculo,
              marca: veiculo.marca?.nome || '',
              modelo: veiculo.modelo?.nome || '',
            }],
            tamanho: 1 // Tamanho da lista é 1 quando o ID é fornecido
          };
        }),
        catchError(() => of({ veiculos: [], tamanho: 0 })) // Lida com erros, caso o veículo não seja encontrado por algum motivo
      );
    } else {
      return this.http.get<any[]>(this.APIUrl + '/get_veiculo/?order_by=valor').pipe(
        switchMap((veiculos) => {
          const veiculosWithDetails$ = veiculos.map((veiculo) => {
            const marca$ = this.getMarcaById(veiculo.marca).pipe(
              map((marca) => marca?.nome),
              catchError(() => of('')) // Lida com erros, caso a marca não seja encontrada por algum motivo
            );

            const modelo$ = this.getModeloById(veiculo.modelo).pipe(
              map((modelo) => modelo?.nome),
              catchError(() => of('')) // Lida com erros, caso o modelo não seja encontrado por algum motivo
            );

            const foto$ = veiculo.foto
              ? this.http.get(this.APIUrl + '/media/' + veiculo.foto).pipe(
                  catchError(() => of(veiculo.foto))
                )
              : of(veiculo.foto); // Se 'foto' for nulo, retorna o objeto 'veiculo.foto' sem fazer a requisição

            return forkJoin([marca$, modelo$, foto$]).pipe(
              map(([marca, modelo, foto]) => {
                const valorFormatado = parseFloat(veiculo.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                return {
                  ...veiculo,
                  marca,
                  modelo,
                  foto,
                  valor: valorFormatado
                };
              })
            );
          });

          return forkJoin(veiculosWithDetails$).pipe(
            map((veiculosList) => ({
              veiculos: veiculosList,
              tamanho: veiculosList.length // Tamanho da lista de veículos
            }))
          );
        }),
        catchError(() => of({ veiculos: [], tamanho: 0 })) // Lida com erros, caso ocorra algum erro na chamada HTTP
      );
    }
  }


  getVeiculoById(id: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/get_veiculo/' + id);
  }
  
  addVeiculos(nome: string, marcaId: number, modeloId: number, valor: number, foto_name: string) {
    const data = { nome: nome, marca: marcaId, modelo: modeloId, valor: valor, foto: foto_name };
    return this.http.post(this.APIUrl + '/create_veiculo/', data);
  }

  updateVeiculos(id: number, formData: FormData) {
    return this.http.put(this.APIUrl + '/update_veiculo/' + id, formData);
  }

  
  deleteVeiculos(id: number){
    return this.http.delete(this.APIUrl + '/delete_veiculo/' + id);
  }
  
  
  uploadPhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', photo);

    return this.http.post<any>(this.APIUrl + '/upload_image/', formData);
  }


  
  
  // Gets All
  getAllMarcasNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_marca/');
  }
  
  getAllModelosNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_modelo/');
  }
  
  getAllVeiculosNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_veiculo/');
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  
  getUser(): string {
    return localStorage.getItem('user') || '';
  }
  
  //LOGIN | LOGOUT | REGISTER
  login(username: string, password: string) {
    const url = this.APIUrl + '/login/';
    const payload = { username, password };

    return this.http.post(url, payload).pipe(
      tap((response: any) => {
        this.setToken(response.access); // Define o token no SharedService
        localStorage.setItem('isLoggedIn', 'true'); // Armazena que o usuário está logado
        localStorage.setItem('user', username);
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      })
      
    );
  }
  
  logout(error = false) {
    this.deleteToken();
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('user', '');
    if (error) {
        this.notifyService.showError("Faça login novamente.", "Sua sessão expirou!")
    } else {
        this.notifyService.showSuccess("", "Sessão encerrada com sucesso!");
    }    
  
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }
  
  register(username: string, password: string) {
    const url = this.APIUrl + '/register_admin/';
    const payload = { username, password };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(url, payload, httpOptions).pipe(
        catchError((error: any) => {
        console.error('Erro na solicitação:', error);
        throw error; // Rejeita o observable com o erro capturado
      }),
      tap((response: any) => {
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      })
      
    );
  }
  
  
  // FILTRO
  getFilteredVeiculosList(veiculosList: any[], brands: string[], models: string[]): any[] {
    return veiculosList.filter(veiculo => {
      const brandMatch = brands.length === 0 || brands.includes(veiculo.marca);
      const modelMatch = models.length === 0 || models.includes(veiculo.modelo);
      return brandMatch && modelMatch;
    });
  }
  
}
