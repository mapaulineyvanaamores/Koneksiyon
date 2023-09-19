import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(contacts: any[], searchTerm: string): any[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return contacts; // Return all contacts if searchTerm is empty
    }

    searchTerm = searchTerm.toLowerCase();
    
    // Filter contacts based on searchTerm
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm)
    );
  }

}
