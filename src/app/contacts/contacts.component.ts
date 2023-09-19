import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
  where,
  startAt, 
  endAt,
} from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})

export class ContactsComponent implements OnInit {
  version = VERSION.full;

  account_name = "Pauline Amores"; // replace later with database account name
  selectedTeam = '';
  isButtonClicked = false;
  tableRowCount = 0;
  contactData!: Observable<any>;

  //SORTING AND FILTERING
  selectedSorting: string = '';
  selectedFilter: string = '';
  names!: Observable<any>;

  //SEARCH 
  searchTerm: string = '';
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  //PAGINATION
  currentPage: number = 1;       // Current page
  pageSize: number = 25;         // Default page size
  totalItems: number = 0;       // Total number of items
  totalPages: number = 1;       // Total number of pages
  pagedContactData: any[] = [];
  lineHeight: string = '20px'; 

  isMoreActionsVisible: { [key: string]: boolean } = {};

  ngOnInit() {
    this.pageSize = 25;
    
    combineLatest([this.startobs, this.endobs]).subscribe((value) => {
      this.names = this.firequery(value[0] as string, value[1] as string);
    });
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    this.isButtonClicked = !this.isButtonClicked;
    this.selectedSorting = value;
    this.getData();
  }

  constructor(private router: Router, private firestore: Firestore, private toastr: ToastrService) { 
    this.getData();
  }

  search(event: Event) {
  const q = (event.target as HTMLInputElement).value;
  console.log('Search term:', q);
  this.startAt.next(q);
  this.endAt.next(q + "\uf8ff");
}


  firequery(start: string, end: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, 'contacts');
    const nameQuery = query(collectionRef, orderBy('name'), startAt(start), endAt(end));
    return collectionData(nameQuery, { idField: 'id' });
  }
  
  navigateToAddContact() {
    this.router.navigate(['/app-add-contact']);
  }

  navigateToEditContact(id: string) {
    this.router.navigate(['/app-edit-contact', id]); 
  }

  navigateToViewContact(id: string) {
    this.router.navigate(['/app-view-contact', id]); 
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'contacts');
  
    // Create a reference to the Firestore collection
    const q = query(collectionInstance);
  
    // Initialize a variable to store the sorted query
    let sortedQuery;
  
    // Check the selected sorting option and apply orderBy accordingly
    switch (this.selectedSorting) {
      case 'alpha-high':
        sortedQuery = query(q, orderBy('name', 'asc'));
        break;
      case 'alpha-low':
        sortedQuery = query(q, orderBy('name', 'desc'));
        break;
      case 'date-latest':
        sortedQuery = query(q, orderBy('creationDate', 'desc'));
        break;
      case 'date-oldest':
        sortedQuery = query(q, orderBy('creationDate', 'asc'));
        break;
      default:
        // Default case or when "Sort By" is selected
        // Just use the unsorted query
        sortedQuery = q;
        break;
    }
  
      // Apply filtering based on the selected filter
    switch (this.selectedFilter) {
      case 'all-contacts':
        // No additional filtering needed for "All Contacts"
        break;
      case 'favorite-contacts':
        // Add a filter to only include "favorite" contacts
        sortedQuery = query(sortedQuery, where('contactType', '==', 'favorite'));
        break;
      default:
        // Default case or when "Filters" is selected
        // No additional filtering needed
        break;
    }

       // Subscribe to the sorted query and log the results
  collectionData(sortedQuery, { idField: 'id' }).subscribe((val) => {
    console.log(val);
    this.totalItems = val.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Calculate startIndex and endIndex for pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Update pagedContactData with the sliced data
    this.pagedContactData = val.slice(startIndex, endIndex);
  });


  // Update your component's contactData with the sorted data
  this.contactData = collectionData(sortedQuery, { idField: 'id' });

    this.contactData.subscribe((data) => {
      this.tableRowCount = data.length;
    });
  }
  
  // Add a method to change the current page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  changePageSize(newSize: number) {
    if (newSize >= 5 && newSize <= 25) {
      this.pageSize = newSize;

    // Determine the appropriate line height based on the selected page size
      if (newSize === 10) {
        this.lineHeight = '50px'; // Line height for 10 rows per page
      } else if (newSize === 5) {
        this.lineHeight = '50px'; // Line height for 25 rows per page
      }
      else if (newSize ===25) {
        this.lineHeight = '30px';
      }
      this.currentPage = 1; // Reset to the first page when changing page size
      this.getData();
    }
  }
  
  async toggleFavorite(id: string, contactType: any) {
    const docInstance = doc(this.firestore, 'contacts', id);

    console.log('Data before calling toggleFavorite:', contactType);

    const normalToggle = { contactType: 'normal' };
    const favoriteToggle = { contactType: 'favorite' };
  
    console.log('toggleFavorite called with id:', id);
    console.log('data.contactType:', contactType);
  
    if (contactType === 'normal') {
      try {
        await updateDoc(docInstance, favoriteToggle);
        contactType = 'favorite'; 
        this.toastr.success('Contact is Now a Favorite.', 'Success');
        console.log('Contact is Now a Favorite');
      } catch (error) {
        this.toastr.error('Error:' + error, 'Error');
        console.error('Error:', error);
      }
    } else if (contactType === 'favorite') {
      try {
        await updateDoc(docInstance, normalToggle);
        contactType = 'favorite'; 
        this.toastr.success('Revoked Favorite for Contact.', 'Success');
        console.log('Revoked Favorite for Contact');
      } catch (error) {
        this.toastr.error('Error:' + error, 'Error');
        console.error('Error:', error);
      }
    }
  }
  
  deleteData(id: string) {
    // Show a confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to delete this contact?');
  
    // Check if the user confirmed the deletion
    if (userConfirmed) {
      const docInstance = doc(this.firestore, 'contacts', id);
      deleteDoc(docInstance)
        .then(() => {
          this.toastr.success('Contact is Deleted Successfully.', 'Success');
          console.log('Contact is Deleted Successfully');
        })
        .catch((error) => {
          this.toastr.error('Error deleting contact:' + error, 'Error');
          console.error('Error deleting contact:', error);
        });
    } else {
      this.toastr.error('Deletion cancelled by the user', 'Cancelled');
      console.log('Deletion cancelled by the user');
    }
  }  

  updateData(id: string){
    doc(this.firestore, 'contacts', id);
  }

  viewData(id: string){
    doc(this.firestore, 'contacts', id);
  }
}
