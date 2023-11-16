import { Component, OnInit } from '@angular/core';
import { Hub } from '../hub';
import { HubList } from '../hub-list';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit {
    hubs: Hub[] = [];
    hubList: HubList | undefined;
    currentPage: number = 0;
    pageStart: number = 0;
    pageEnd: number = 0;
    totalHubs: number = 0;
    orderBy: string = "id";
    direction: string = "asc";

    constructor (private hubService: HubService) {}

    ngOnInit (): void {
        this.getHubs ();
    }

    private getHubs (): void {
        this.hubService.getHubs (this.currentPage, this.orderBy, this.direction).subscribe (hubList => {
            this.hubList = hubList;
            this.hubs = hubList._embedded.hubs;
            this.pageStart = hubList.page.number * hubList.page.size + 1;
            this.pageEnd = this.pageStart + this.hubs.length - 1;
            this.totalHubs = hubList.page.totalElements;
        });
    }

    filterBySpokeCount (event: Event): void {
        const spokeCount = (event.target as HTMLInputElement).value;

        if (spokeCount == "") {
            this.getHubs ();
            return;
        }

        this.hubService.getBySpokeCount (this.currentPage, Number (spokeCount), this.orderBy, this.direction).subscribe (hubList => {
            this.hubList = hubList;
            this.hubs = hubList._embedded.hubs;
            this.pageStart = hubList.page.number * hubList.page.size + 1;
            this.pageEnd = this.pageStart + this.hubs.length - 1;
            this.totalHubs = hubList.page.totalElements;
        });
    }
}
