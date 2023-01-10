import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: 'create', component: CreateComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'update/:id', component: UpdateComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'delete/:id', component: DeleteComponent, canActivate: [IsAuthenticatedGuard] },
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}