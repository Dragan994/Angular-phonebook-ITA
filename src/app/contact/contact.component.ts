import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { StorageService } from '../storage.service';
import { ContactInterface } from './Contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contactData!: ContactInterface;


  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    console.log(this.contactData)
  }

  editContact():void{
    this.storageService.openEditContactForm(this.contactData)
  }

  deleteContact():void{
    this.storageService.deleteContact(this.contactData)
  }

}
