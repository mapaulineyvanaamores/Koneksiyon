import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from 'src/app/shared/components/store/country-data-store'; // Import your country data here
import { 
  Firestore,
  collection,
  addDoc,
  serverTimestamp, query, where, getDocs
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public countries!: any[]; // Declare the countries property here

  constructor(private router: Router, private firestore: Firestore, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.countries = countries; // Initialize countries with the data imported from your country data store
  }

  navigateToContacts() {
    this.router.navigate(['/app-contacts']); // Navigate to the '/app-contacts' route
  }

  async addData(f: any) {
    const name = f.value.name;
    const email = f.value.email;
    const phoneNumber = f.value.phonenumber;
    const isNameUnique = await this.isNameNotUnique(name);
    console.log('isNameUnique:', !isNameUnique)
    
    //Contact names must be set and be unique.
    if (isNameUnique) {
      this.toastr.error('Contact name is not unique. Please choose a different name.', 'Error');
      console.log('Contact name is not unique. Please choose a different name.');
      return;
    }
    
    //Email must follow a typical email address format.
    if (!name && !email && (!phoneNumber || phoneNumber.replace(/\D/g, '').length !>= 13)) {
      this.toastr.error('Name is required.', 'Error');
      console.log('Name is required.');
      return;
    }

    function isValidEmail(email: string): boolean {
      // Regular expression to validate email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }
    
     // Check if both email and phoneNumber are falsy
    if ((!email || !isValidEmail(email)) && (!phoneNumber || /^\+?\d{1,13}$/.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length >= 13)) {
      this.toastr.error('At least one of either Email or Telephone Number must be set, and Email must have a valid format.', 'Error');
      console.log('At least one of either Email or Telephone Number must be set, and Email must have a valid format.');
      return;
    }

    // Check if phoneNumber is valid
    if (phoneNumber && (!/^\+?\d{1,13}$/.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length >= 13)) {
      this.toastr.error('Telephone Number must contain only numeric characters and an optional "+" prefix with exactly or less than 13 digits.', 'Error');
      console.log('Telephone Number must contain only numeric characters and an optional "+" prefix with exactly or less than 13 digits.');
      return;
    }

    f.value.name = this.capitalizeFirstLetter(name);
    this.toastr.success('Contact Saved successfully!', 'Success');
    console.log('Contact Saved successfully!');
    
    const collectionInstance = collection(this.firestore, 'contacts');

    const contactData = {
      ...f.value,
      creationDate: serverTimestamp(),
      contactType: 'normal'
    };

    await addDoc(collectionInstance, contactData)
      .then(() => {
        this.toastr.success('Contact Updated Successfully!', 'Success');
        console.log('Contact Added successfully!');
        this.router.navigate(['/app-contacts']);
      })
      .catch((err) => {
        this.toastr.error('Contact Cannot Be Saved!', 'Error');
        console.log(err);
      });
  }

  capitalizeFirstLetter(name: string): string {
    return name
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back together with spaces
  }

  //Contact names must be set and be unique.
  async isNameNotUnique(name: string): Promise<boolean> {
    try {
      const collectionInstance = collection(this.firestore, 'contacts');
      const q = query(collectionInstance, where('name', '==', name));
      console.log(q);
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      this.toastr.error('Error checking name uniqueness:', 'Error');
      console.error('Error checking name uniqueness:', error);
      return false; // Handle the error appropriately
    }
  }  
}

