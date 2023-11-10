export interface Hub {
    id: number;
    manufacturer: string;
    description: string;
    inService: boolean;
    dateAcquired: string;
    spokeHoles: number;
    rightFlangeFromLocknut: number;
    rightFlangeToLeftFlange: number;
    leftFlangeFromLocknut: number;
    locknutSpacing: number;
    spokeHoleDiameter: number;
    rightFlangeThickness: number;
    leftFlangeThickness: number;
    rightFlangeDiameter: number;
    leftFlangeDiameter: number;
    _links: object;
}
