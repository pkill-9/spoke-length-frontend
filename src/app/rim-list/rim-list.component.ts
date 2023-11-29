import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
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
    @Output() rimSelectedEvent = new EventEmitter<string> ();
    rims: Rim[] = [];
    rimList: RimList | undefined;
    rimSelected: number = 0;
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

    selectedRim (rimID: number): void {
        this.rimSelected = rimID;
        this.rimSelectedEvent.emit (rimID.toString ());
    }

    private getRims (): void {
        var numSpokes: number | null;
        var etrtoDiameter: number | null;

        numSpokes = (this.spokeCount != "")? Number (this.spokeCount) : null;
        etrtoDiameter = null;

        this.rimService.getRims (this.currentPage, numSpokes, etrtoDiameter, this.orderBy, this.direction).subscribe (rimList => {
            this.rimList = rimList;
            this.rims = rimList._embedded.rims;
            this.pageStart = rimList.page.number * rimList.page.size + 1;
            this.pageEnd = this.pageStart + this.rims.length - 1;
            this.totalRims = rimList.page.totalElements;

            if (this.currentPage >= rimList.page.totalPages - 1)
                this.currentPage = rimList.page.totalPages - 1;

            if (rimList.page.totalPages == 0)
                this.currentPage = 0;
        });
    }

    nextPage (): void {
        if (this.rimList && (this.currentPage == this.rimList.page.totalPages - 1))
            return;

        this.currentPage ++;
        this.getRims ();
    }

    previousPage (): void {
        if (this.currentPage == 0)
            return;

        this.currentPage --;
        this.getRims ();
    }

    sortBy (fieldName: string, direction: string): void {
        this.orderBy = fieldName;
        this.direction = direction;
        this.getRims ();
    }
}
