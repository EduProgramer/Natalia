import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SandwichFormComponent } from './sandwich-form/sandwich-form.component';
import { SandwichListComponent } from './sandwich-list/sandwich-list.component'
import { RouterModule, Routes } from '@angular/router';
import { SandwichDetailsComponent } from './sandwich-details/sandwich-details.component';

const routers: Routes = [
  {path: 'sandwiches', component: SandwichListComponent},
  {path: 'sandwiches/form', component: SandwichFormComponent},
  {path: 'sandwiches/:id', component: SandwichDetailsComponent}
]
@NgModule({
  declarations: [
    SandwichFormComponent,
    SandwichListComponent,
    SandwichDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routers),
    
  ],
  exports: [
    SandwichFormComponent,
    SandwichListComponent
  ]
})
export class SandwichModule { }
