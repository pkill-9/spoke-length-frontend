import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
    spokeCountInput: string = '';
    selectedHubID: string = '';
    selectedRimID: string = '';

    spokeCountEntry (event: Event): void {
        this.spokeCountInput = (event.target as HTMLInputElement).value;
    }

    selectHub (hubID: string): void {
        this.selectedHubID = hubID;
    }

    selectRim (rimID: string): void {
        this.selectedRimID = rimID;
    }
}
