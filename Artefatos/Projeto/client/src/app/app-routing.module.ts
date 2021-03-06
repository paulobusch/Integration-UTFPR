import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login-form/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MenuComponent } from './shared/components/menu/menu.component';
//import { TrainingComponent } from './trainings/training-form/training.component';
import { TrainingFormComponent } from './training/training-form/training-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './shared/guards/auth.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { UserComponent } from './users/user-form/user-form.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
//import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { TrainingListComponent } from './training/training-list/training-list.component';
import { DietListComponent } from './diets/diet-list/diet-list.component';
import { DietComponent } from './diets/diet-forms/diet-form.component';
import { EquipmentListComponent } from './equipments/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipments/equipment-form/equipment-form.component';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';
import { CalendarListComponent } from './calendar/calendar-list/calendar-list.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], children: [
    { path: 'confirm', component: ConfirmDialogComponent, canActivate: [AuthGuard] },
    { path: 'training', component: TrainingListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: TrainingFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: TrainingFormComponent } }
    ] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: UserComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: UserComponent } }
    ] },
    { path: 'equipments', component: EquipmentListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: EquipmentFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: EquipmentFormComponent } }
    ] },
    { path: 'diets', component: DietListComponent, canActivate: [AuthGuard], children: [
        {path: 'new', component: BottomSheetComponent, data: {form: DietComponent} },
        {path: 'edit/:id', component: BottomSheetComponent, data: { form: DietComponent} }
    ] },
    { path: 'calendars', component: CalendarListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: CalendarFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: CalendarFormComponent } }
    ] },
    { path: 'payments', component: PaymentListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: PaymentFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: PaymentFormComponent } }
    ] }
  ] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
