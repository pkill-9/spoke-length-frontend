import { Hub } from './hub';

export interface HubList {
    _embedded: {
        hubs: Hub[];
    };
    _links: object;
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
}
