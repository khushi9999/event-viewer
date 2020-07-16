import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

   constructor(private http: HttpClient) { }

dataJsonLoad(path) {
 return this.http.get(path).pipe(
    tap((res: any) => {
      console.log(res);
    })
  );
}


deleteRecord(path) {

  return this.http.delete(path).pipe(
     tap((res: any) => {
       console.log(res);
     })
   );
 }
}
