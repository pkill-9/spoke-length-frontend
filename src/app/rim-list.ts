import { Rim } from './rim';

export interface RimList {
    _embedded: {
        rims: Rim[];
    };
    _links: object
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
}
