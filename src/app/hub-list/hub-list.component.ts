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
    locknutSpacing: string = "";

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

    setLocknutSpacing (event: Event): void {
        this.locknutSpacing = (event.target as HTMLInputElement).value;
        this.getHubs ();
    }

    private getHubs (): void {
        var numSpokes: number | null;
        var locknutSpacing: number | null;

        numSpokes = (this.spokeCount != "")? Number (this.spokeCount) : null;
        locknutSpacing = (this.locknutSpacing != "")? Number (this.locknutSpacing) : null;

        this.hubService.getHubs (this.currentPage, numSpokes, locknutSpacing, this.orderBy, this.direction).subscribe (hubList => {
            this.hubList = hubList;
            this.hubs = hubList._embedded.hubs;
            this.pageStart = hubList.page.number * hubList.page.size + 1;
            this.pageEnd = this.pageStart + this.hubs.length - 1;
            this.totalHubs = hubList.page.totalElements;

            if (this.currentPage >= hubList.page.totalPages - 1)
                this.currentPage = hubList.page.totalPages - 1;

            if (hubList.page.totalPages == 0)
                this.currentPage = 0;
        });
    }

    nextPage (): void {
        if (this.hubList && (this.currentPage == this.hubList.page.totalPages - 1))
            return;

        this.currentPage ++;
        this.getHubs ();
    }

    previousPage (): void {
        if (this.currentPage == 0)
            return;

        this.currentPage --;
        this.getHubs ();
    }

    sortBy (fieldName: string, direction: string): void {
        this.orderBy = fieldName;
        this.direction = direction;
        this.getHubs ();
    }
}
