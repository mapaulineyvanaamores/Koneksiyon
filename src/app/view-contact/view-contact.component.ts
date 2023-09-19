import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { 
  Firestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  constructor(private router: Router, private firestore: Firestore, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const getId = this.route.snapshot.params['id']; // Use snapshot to get the initial ID
    console.log('Received ID:', getId);

    await this.getData(getId); // Wait for getData to complete
  }

  getDocData: any;
  docId: string = '';
  
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
        console.log('No matching document found.');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }
}
