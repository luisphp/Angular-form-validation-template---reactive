import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { TemplateComponent } from '../app/pages/template/template.component';
import { ReactiveComponent } from '../app/pages/reactive/reactive.component';

const routes: Routes = [
    { path: 'template', component: TemplateComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: '**',   redirectTo: 'reactive', pathMatch: 'full' },
    { path: '',   redirectTo: 'reactive', pathMatch: 'full' }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
