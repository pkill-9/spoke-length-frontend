import { Injectable } from '@angular/core';
import { Rim } from './rim';
import { RimList } from './rim-list';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RimService {
    constructor (private http: HttpClient) {}
    httpOptions = {
        headers: new HttpHeaders ({'Content-Type': 'application/json'})
    };

    getRims (page: number, spokeCount: number | null, etrtoDiameter: number | null, orderBy: string, direction: string): Observable <RimList> {
        var spokeCountFilter: string;
        var diameterFilter: string;

        spokeCountFilter = (spokeCount)? `spokeHoles=${spokeCount}&` : '';
        diameterFilter = (etrtoDiameter)? `etrtoDiameter=${etrtoDiameter}&` : '';

        const url = `/api/rims?${spokeCountFilter}${diameterFilter}page=${page}&size=10&sort=${orderBy},${direction}`;

        return this.http.get<RimList> (url).pipe (
            catchError (this.handleError<RimList> ("getRims"))
        );
    }

    private handleError<T> (operation = 'operation', result ?: T) {
        return (error: any): Observable<T> => {
            console.error (error);
            return of (result as T);
        };
    }
}
