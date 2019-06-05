import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const routes: Routes = [
  // main page
  { path: '', component: PostListComponent },
  // localhost:4200/create
  { path: 'create', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Angular is now aware of routes
  exports: [RouterModule] // Use module outside (app.module)
})
export class AppRoutingModule {}
