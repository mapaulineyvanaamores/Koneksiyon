import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component'; 
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  { path: 'app-contacts', component: ContactsComponent },
  { path: 'app-add-contact', component: AddContactComponent },
  { path: 'app-edit-contact/:id', component: EditContactComponent },
  { path: 'app-view-contact/:id', component: ViewContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
