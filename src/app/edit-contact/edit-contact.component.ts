import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from 'src/app/shared/components/store/country-data-store'; // Import your country data here
import { ActivatedRoute } from '@angular/router';
import { 
  Firestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  query, 
  where, 
  getDocs,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact', 
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  currentContact: any = {};
  contactData!: Observable<any>;
  public countries!: any[]; // Declare the countries property here
  docId: string = '';
  getDocData: any;
  formData: any = {};

  constructor(
    private router: Router, 
    private firestore: Firestore,
    private route: ActivatedRoute,
    private toastr: ToastrService) 
    {
    }

    async ngOnInit(): Promise<void> {
      this.countries = countries;
      const getId = this.route.snapshot.params['id']; // Use snapshot to get the initial ID
      console.log('Received ID:', getId);

      await this.getData(getId); // Wait for getData to complete
    }

  navigateToContacts() {
    this.router.navigate(['/app-contacts']); // Navigate to the '/app-contacts' route
  }
  
  async getData(getId: string) {
    console.log('Querying for ID:', getId); // Log the id value you're using in the query
    const documentRef = doc(this.firestore, 'contacts', getId);
  
    try {
      const docSnapshot = await getDoc(documentRef);
      if (docSnapshot.exists()) {
        this.getDocData = docSnapshot.data(); // Assign the data to the property
        console.log('Document Data:', this.getDocData);
      } else {
        this.toastr.error('No matching document found.', 'Error');
        console.log('No matching document found.');
      }
    } catch (error) {
      this.toastr.error('Error fetching document', 'Error');
      console.error('Error fetching document:', error);
    }
  }
  
  capitalizeFirstLetter(name: string): string {
    return name
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back together with spaces
  }

  async updateData(getId: string, formData: any) {
    console.log('Doc ID:', getId);
    console.log('Updated Data Values:', formData);
    
    const docRef = doc(this.firestore, 'contacts', getId);
    const phoneNumber = formData.phonenumber;
    const phoneNumberRegex = /^\+?\d{1,13}$/;
    const email = formData.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (formData.name && formData.name.trim() !== "") {
      // The 'name' property exists and is not an empty string.
      console.log(formData.name);
      const isUnique = await this.isNameNotUnique(formData.name);
      if (!isUnique) {
        this.toastr.info('Name is unique, performing the update...', 'Info');
        console.log('Name is unique, performing the update...');
    
        formData.updateDate = serverTimestamp();
    
        updateDoc(docRef, formData)
          .then(() => {
            formData.name = this.capitalizeFirstLetter(formData.name);
            this.toastr.success('Contact Updated Successfully!', 'Success');
            console.log('Contact Updated Successfully!');
            this.router.navigate(['/app-contacts']);
          })
          .catch((err) => {
            this.toastr.error('Error updating document.', 'Error');
            console.error('Error updating document:', err);
          });
    
      } else {
        this.toastr.error('Name is not unique, cannot update.', 'Error');
        console.log('Name is not unique, cannot update.');
      }
    } else {
      this.toastr.info('Name did not change or is empty.', 'No Update');
      console.log('Name did not change or is empty, no update needed.');
    }

    if (formData.email !== undefined || formData.phonenumber !== undefined) {
      if (formData.email && formData.email.match(emailRegex)) {
        // Email is valid, perform the update
        this.toastr.info('Email is valid, performing the update...', 'Info');
        console.log('Email is valid. Performing the update...');
      } else if (formData.phonenumber && formData.phonenumber.match(phoneNumberRegex)) {
        // Phone number is valid, perform the update
        this.toastr.info('Phone Number is valid, performing the update...', 'Info');
        console.log('Phone Number is valid. Performing the update...');
      } else {
        // Neither email nor phone number is valid
        this.toastr.error('Either Email/Phone Number is not valid. Cannot update.', 'Error');
        console.log('Either Email/Phone Number is not valid. Cannot update.');
        return; // Exit the function to prevent further processing
      }
    
      // Common update logic (if email or phone number is valid)
      formData.updateDate = serverTimestamp();
    
      updateDoc(docRef, formData)
        .then(() => {
          this.toastr.success('Contact Updated Successfully!', 'Success');
          console.log('Contact Updated Successfully!');
          this.router.navigate(['/app-contacts']);
        })
        .catch((err) => {
          this.toastr.error('Error updating document.', 'Error');
          console.error('Error updating document:', err);
        });
    } else {
      // Neither email nor phone number is set, no update needed
      this.toastr.info('Neither Email nor Phone Number is set.', 'No Update');
      console.log('Neither Email nor Phone Number is set. No update needed.');
    }
    
    if (formData.nickname !== undefined) {
      if (formData.nickname === "") {
        this.toastr.info('Nickname removed.', 'Info');
        console.log('Nickname changed to an empty string.');
      } else {
        this.toastr.info('Nickname changed.', 'Info');
        console.log('Nickname changed to:', formData.nickname);
      }
    
      this.toastr.info('Performing the update...', 'Info');
      console.log('Performing the update...');
    
      formData.updateDate = serverTimestamp();
    
      updateDoc(docRef, formData)
        .then(() => {
          this.toastr.success('Contact Updated Successfully!', 'Success');
          console.log('Contact Updated Successfully!');
          this.router.navigate(['/app-contacts']);
        })
        .catch((err) => {
          this.toastr.error('Error updating document.', 'Error');
          console.error('Error updating document:', err);
        });
    } else {
      this.toastr.info('Nickname is not changed.', 'No Update');
      console.log('Nickname is not present. No update needed.');
    }
    
      if (formData.affiliation !== undefined) {
        if (formData.affiliation === "") {
          this.toastr.info('Affiliation removed.', 'Info');
          console.log('Affiliation changed to an empty string.');
        } else {
          this.toastr.info('Affiliation changed.', 'Info');
          console.log('Affiliation changed to:', formData.affiliation);
        }

        this.toastr.info('Affiliation changed, performing the update...', 'Info');
        console.log('Affiliation changed, performing the update...');

        formData.updateDate = serverTimestamp();

        updateDoc(docRef, formData)
            .then(() => {
                this.toastr.success('Contact Updated Successfully!', 'Success');
                console.log('Contact Updated Successfully!');
                this.router.navigate(['/app-contacts']);
            })
            .catch((err) => {
                this.toastr.error('Error updating document.', 'Error');
                console.error('Error updating document:', err);
            });

      } else {
        this.toastr.info('Affiliation is not changed.', 'No Update');
          console.log('Affiliation is not changed. No update needed.');
      }

      if (formData.description!== undefined) {
        if (formData.description === "") {
          this.toastr.info('Description removed.', 'Info');
          console.log('Description changed to an empty string.');
        } else {
          this.toastr.info('Description changed.', 'Info');
          console.log('Description changed to:', formData.description);
        }

        this.toastr.info('Description changed, performing the update...', 'Info');
        console.log('Description changed, performing the update...');

        formData.updateDate = serverTimestamp();

        updateDoc(docRef, formData)
            .then(() => {
                this.toastr.success('Contact Updated Successfully!', 'Success');
                console.log('Contact Updated Successfully!');
                this.router.navigate(['/app-contacts']);
            })
            .catch((err) => {
                this.toastr.error('Error updating document.', 'Error');
                console.error('Error updating document:', err);
            });

      } else {
          this.toastr.info('Description is not changed.', 'No Update');
          console.log('Description is not changed. No update needed.');
      }  
  }

  saveContact() {
    const getId = this.route.snapshot.params['id'];
    this.updateData(getId, this.formData);
  }

  async isNameNotUnique(name: string) {
    try {
      const collectionInstance = collection(this.firestore, 'contacts');
      const q = query(collectionInstance, where('name', '==', name));
      const querySnapshot = await getDocs(q);
      console.log('Checking if name is unique:', name);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking name uniqueness:', error);
      throw error;
    }
  }  
}
