import { Component, OnInit } from '@angular/core';
import { Rim } from '../rim';
import { RimList } from '../rim-list';
import { RimService } from '../rim.service';

@Component({
  selector: 'app-rim-list',
  templateUrl: './rim-list.component.html',
  styleUrls: ['./rim-list.component.css']
})
export class RimListComponent implements OnInit {
    rims: Rim[] = [];
    rimList: RimList | undefined;
    currentPage: number = 0;
    pageStart: number = 0;
    pageEnd: number = 0;
    totalRims: number = 0;
    orderBy: string = "id";
    direction: string = "asc";

    constructor (private rimService: RimService) {}

    ngOnInit (): void {
        this.getRims ();
    }

    private getRims (): void {
        this.rimService.getRims (this.currentPage, this.orderBy, this.direction).subscribe (rimList => {
            this.rimList = rimList;
            this.rims = rimList._embedded.rims;
            this.pageStart = rimList.page.number * rimList.page.size + 1;
            this.pageEnd = this.pageStart + this.rims.length - 1;
            this.totalRims = rimList.page.totalElements;
        });
    }

    /*
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
    */
}
