import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HubService } from '../hub.service';
import { Hub } from '../hub';

@Component({
  selector: 'app-hub-details',
  templateUrl: './hub-details.component.html',
  styleUrls: ['./hub-details.component.css']
})
export class HubDetailsComponent implements OnInit {
    hub: Hub | undefined;

    constructor (private route: ActivatedRoute, private hubService: HubService, private location: Location) {}

    ngOnInit (): void {
        this.getHub ();
    }

    getHub (): void {
        const hubId = Number (this.route.snapshot.paramMap.get ('id'));

        if (hubId) {
            this.hubService.getHub (hubId).subscribe (hub => this.hub = hub);
        } else {
            this.hub = {
                id: 0,
                manufacturer: '',
                description: '',
                inService: false,
                dateAcquired: '',
                spokeHoles: 0,
                rightFlangeFromLocknut: 0,
                rightFlangeToLeftFlange: 0,
                leftFlangeFromLocknut: 0,
                locknutSpacing: 0,
                spokeHoleDiameter: 0,
                rightFlangeThickness: 0,
                leftFlangeThickness: 0,
                rightFlangeDiameter: 0,
                leftFlangeDiameter: 0,
                _links: {}
            } as Hub;
        }
    }

    update (): void {
        if (this.hub) {
            if (this.hub.id) {
                this.hubService.updateHub (this.hub).subscribe (() => this.goBack ());
            } else {
                this.hubService.createHub (this.hub).subscribe (() => this.goBack ());
            }
        }
    }

    goBack (): void {
        this.location.back ();
    }
}
