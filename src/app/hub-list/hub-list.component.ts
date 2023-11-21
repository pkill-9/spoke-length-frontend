import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Hub } from '../hub';
import { HubList } from '../hub-list';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css']
})
export class HubListComponent implements OnInit, OnChanges {
    @Input() spokeCount = '';
    @Output() hubSelectedEvent = new EventEmitter<string> ();
    hubs: Hub[] = [];
    hubList: HubList | undefined;
    hubSelected: number = 0;
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

    /**
     *  Called every time the parent CalculatorComponent updates the spoke count
     *  from the value entered in the text field. The value is placed in the spokeCount
     *  prop, all we need to do is fetch the list of hubs from the API.
     */
    ngOnChanges () {
        this.getHubs ();
    }

    selectedHub (hubID: number): void {
        this.hubSelected = hubID;
        this.hubSelectedEvent.emit (hubID.toString ());
    }

    private getHubs (): void {
        if (this.spokeCount == "") {
            this.hubService.getHubs (this.currentPage, this.orderBy, this.direction).subscribe (hubList => {
                this.hubList = hubList;
                this.hubs = hubList._embedded.hubs;
                this.pageStart = hubList.page.number * hubList.page.size + 1;
                this.pageEnd = this.pageStart + this.hubs.length - 1;
                this.totalHubs = hubList.page.totalElements;
            });
        } else {
            this.hubService.getBySpokeCount (this.currentPage, Number (this.spokeCount), this.orderBy, this.direction).subscribe (hubList => {
                this.hubList = hubList;
                this.hubs = hubList._embedded.hubs;
                this.pageStart = hubList.page.number * hubList.page.size + 1;
                this.pageEnd = this.pageStart + this.hubs.length - 1;
                this.totalHubs = hubList.page.totalElements;
            });
        }
    }
}
