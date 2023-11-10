import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubListComponent } from './hub-list/hub-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'hub-list', pathMatch: 'full'},
    {path: 'hub-list', component: HubListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
