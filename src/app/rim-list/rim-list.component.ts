import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Rim } from '../rim';
import { RimList } from '../rim-list';
import { RimService } from '../rim.service';

@Component({
  selector: 'app-rim-list',
  templateUrl: './rim-list.component.html',
  styleUrls: ['./rim-list.component.css']
})
export class RimListComponent implements OnInit, OnChanges {
    @Input() spokeCount: string = '';
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

    ngOnChanges (): void {
        this.getRims ();
    }

    private getRims (): void {
        if (this.spokeCount == "") {
            this.rimService.getRims (this.currentPage, this.orderBy, this.direction).subscribe (rimList => {
                this.rimList = rimList;
                this.rims = rimList._embedded.rims;
                this.pageStart = rimList.page.number * rimList.page.size + 1;
                this.pageEnd = this.pageStart + this.rims.length - 1;
                this.totalRims = rimList.page.totalElements;
            });
        } else {
            this.rimService.getBySpokeCount (this.currentPage, Number (this.spokeCount), this.orderBy, this.direction).subscribe (rimList => {
                this.rimList = rimList;
                this.rims = rimList._embedded.rims;
                this.pageStart = rimList.page.number * rimList.page.size + 1;
                this.pageEnd = this.pageStart + this.rims.length - 1;
                this.totalRims = rimList.page.totalElements;
            });
        }
    }
}
