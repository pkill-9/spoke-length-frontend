import { Injectable } from '@angular/core';
import { Hub } from './hub';
import { HubList } from './hub-list';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubService {
    constructor (private http: HttpClient) {}
    httpOptions = {
        headers: new HttpHeaders ({'Content-Type': 'application/json'})
    };

    getHubs (page: number, orderBy: string, direction: string): Observable <HubList> {
        const url = `/api/hubs?page=${page}&size=10&sort=${orderBy},${direction}`;

        return this.http.get<HubList> (url).pipe (
            catchError (this.handleError<HubList> ("getHubs"))
        );
    }

    private handleError<T> (operation = 'operation', result ?: T) {
        return (error: any): Observable<T> => {
            console.error (error);
            return of (result as T);
        };
    }
}
