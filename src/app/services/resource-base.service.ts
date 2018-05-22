import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page.model';

export abstract class ResourceBaseService<T> {
    constructor(
        public http: HttpClient,
        private API_URL: string,
        private API_SEARCH: string,
        private getToken: () => string
    ) {}

    load(from: number = 0, limit: number = 5): Observable<Page<T>> {
        let params = {
            offset: from.toString()
        };
        if (limit > 0 && limit !== Infinity) {
            params['limit'] = limit.toString();
        }
        return this.http.get(this.API_URL, { params }) as any;
    }

    create(item: T): Observable<T> {
        return this.http.post(`${ this.API_URL }?token=${ this.getToken() }`, item) as Observable<T>;
    }

    update(item: T): Observable<T> {
        return this.http.put(`${ this.API_URL }/${ item['_id'] }?token=${ this.getToken() }`, item) as Observable<T>;
    }

    get(id: string): Observable<T> {
        return this.http.get(`${ this.API_URL }/${ id }`) as Observable<T>;
    }

    delete(id: string): Observable<T> {
        return this.http.delete(`${ this.API_URL }/${ id }?token=${ this.getToken() }`) as Observable<T>;
    }

    search(from: number, searchTerm: string): Observable<Page<T>> {
        return this.http.get(
            `${ this.API_SEARCH }/${ searchTerm }?token=${ this.getToken() }&limit=5&offset=${ from }`
        ) as Observable<Page<T>>;
    }
}
