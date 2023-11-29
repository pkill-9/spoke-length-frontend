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

    getHubs (page: number, spokeCount: number | null, locknutSpacing: number | null, orderBy: string, direction: string): Observable <HubList> {
        var spokeCountFilter: string;
        var locknutSpacingFilter: string;

        spokeCountFilter = (spokeCount)? `spokeHoles=${spokeCount}&` : '';
        locknutSpacingFilter = (locknutSpacing)? `locknutSpacing=${locknutSpacing}&` : '';

        const url = `/api/hubs?${spokeCountFilter}${locknutSpacingFilter}page=${page}&size=10&sort=${orderBy},${direction}`;

        return this.http.get<HubList> (url).pipe (
            catchError (this.handleError<HubList> ("getHubs"))
        );
    }

    getHub (id: number): Observable <Hub> {
        const hubUrl = `/api/hubs/${id}`;

        return this.http.get<Hub> (hubUrl).pipe (
            catchError (this.handleError<Hub> (`getHub id = ${id}`))
        );
    }

    updateHub (hub: Hub): Observable <any> {
        const updateUrl = `/api/hubs/${hub.id}`;
        return this.http.put (updateUrl, hub, this.httpOptions).pipe (
            catchError (this.handleError<any> ('updateHub'))
        );
    }

    createHub (hub: Hub): Observable <Hub> {
        const createUrl = '/api/hubs';
        return this.http.post<Hub> (createUrl, hub, this.httpOptions).pipe (
            catchError (this.handleError<Hub> ('createHub'))
        );
    }

    private handleError<T> (operation = 'operation', result ?: T) {
        return (error: any): Observable<T> => {
            console.error (error);
            return of (result as T);
        };
    }
}
