import { Component, OnInit, NgModule } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { ContactInterface } from '../contact/Contact.interface';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {
  public contactFormIsOpen:boolean = false
  public searchFilter:string = ""
  public contactList?: ContactInterface[] | null
  public editContactData: ContactInterface | null = null

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.storageService.initiateStorage()
    this.contactList =  this.storageService.getContactList()

    this.storageService.contactListChangeEvent.subscribe( ()=>{
      this.contactList = this.storageService.getContactList()
    })
    this.storageService.openEditContactFormEvent.subscribe(editContactData=>{
      this.editContactData = editContactData
      this.contactFormIsOpen = true
    })
  }


  filterContacts(){
    this.contactList = this.storageService.getContactList()
    console.log(this.searchFilter)
    if(this.contactList){
      this.contactList = this.contactList.filter( contact =>contact.contactName.includes(this.searchFilter) || contact.phoneNumber.includes(this.searchFilter) ) 
    }
  }



  openContactForm(){
    this.editContactData = null
    this.contactFormIsOpen = true
  }

  closeContactForm(){
    console.log('Closing CF')
    this.contactFormIsOpen = false
  }



}
