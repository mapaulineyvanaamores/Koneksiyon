import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  //sidebar reveal 
  @ViewChild('btn', { static: true }) private btn!: ElementRef;
  @ViewChild('sidebar', { static: true }) private sidebar!: ElementRef;

  ngAfterViewInit() {
    this.btn.nativeElement.addEventListener('click', () => {
      this.sidebar.nativeElement.classList.toggle('active');
    });
  }

  account_name = "Pauline Amores"; //replace later with database account name
  constructor(private router: Router) {
  }
    
}


