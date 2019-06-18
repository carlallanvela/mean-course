import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },   // main page
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] }, // localhost:4200/create
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'} // Lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Angular is now aware of routes
  exports: [RouterModule], // Use module outside (app.module)
  providers: [AuthGuard]
})
export class AppRoutingModule {}
