import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page.model';

export abstract class ResourceBaseService<T> {
    constructor(
        private http: HttpClient,
        private API_URL: string,
        private API_SEARCH: string,
        private token: () => string
    ) {}

    load(from: number): Observable<Page<T>> {
        return this.http.get(`${ this.API_URL }?limit=5&offset=${ from }`) as any;
    }

    create(item: T): Observable<T> {
        return this.http.post(`${ this.API_URL }?token=${ this.token() }`, item) as Observable<T>;
    }

    update(item: T): Observable<T> {
        return this.http.put(`${ this.API_URL }/${ item['_id'] }?token=${ this.token() }`, item) as Observable<T>;
    }

    get(id: string): Observable<T> {
        return this.http.get(`${ this.API_URL }/${ id }`) as Observable<T>;
    }

    delete(id: string): Observable<T> {
        return this.http.delete(`${ this.API_URL }/${ id }?token=${ this.token() }`) as Observable<T>;
    }

    search(from: number, searchTerm: string): Observable<Page<T>> {
        return this.http.get(
            `${ this.API_SEARCH }/${ searchTerm }?token=${ this.token() }&limit=5&offset=${ from }`
        ) as Observable<Page<T>>;
    }
}
