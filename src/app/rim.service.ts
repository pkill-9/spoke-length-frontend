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

    getRims (page: number, orderBy: string, direction: string): Observable <RimList> {
        const url = `/api/rims?page=${page}&size=10&sort=${orderBy},${direction}`;

        return this.http.get<RimList> (url).pipe (
            catchError (this.handleError<RimList> ("getRims"))
        );
    }

    getBySpokeCount (page: number, spokeCount: number, orderBy: string, direction: string): Observable <RimList> {
        const url = `/api/rims/search/findBySpokeHoles?spokeHoles=${spokeCount}&page=${page}&size=10&sort=${orderBy},${direction}`;

        return this.http.get<RimList> (url).pipe (
            catchError (this.handleError<RimList> ("getBySpokeHoles"))
        );
    }

    private handleError<T> (operation = 'operation', result ?: T) {
        return (error: any): Observable<T> => {
            console.error (error);
            return of (result as T);
        };
    }
}
