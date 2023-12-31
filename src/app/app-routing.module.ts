import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubListComponent } from './hub-list/hub-list.component';
import { HubDetailsComponent } from './hub-details/hub-details.component';
import { RimListComponent } from './rim-list/rim-list.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
    {path: '', redirectTo: 'calculator', pathMatch: 'full'},
    {path: 'calculator', component: CalculatorComponent},
    {path: 'hubs/:id', component: HubDetailsComponent},
    {path: 'hub-list', component: HubListComponent},
    {path: 'rim-list', component: RimListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
