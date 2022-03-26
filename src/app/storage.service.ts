import { EventEmitter, Injectable, Output } from '@angular/core';
import { ContactInterface } from './contact/Contact.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  @Output() contactListChangeEvent = new EventEmitter()
  @Output() openEditContactFormEvent = new EventEmitter()
  
  private CONTACT_LIST: string = "contactList"
  public contactList!: ContactInterface[] | null


  constructor() {
  }


  initiateStorage(): void{
    const storage = localStorage.getItem(this.CONTACT_LIST)
    if(!storage){
      localStorage.setItem(this.CONTACT_LIST, JSON.stringify([]))
    }
  }



  addContact(contactData: ContactInterface): void{
    const storage = localStorage.getItem(this.CONTACT_LIST)
    if(storage){
      const contactList = JSON.parse(storage)
      contactData.id = uuid()
      contactList.push(contactData)
      console.log(contactList)
      localStorage.setItem(this.CONTACT_LIST, JSON.stringify(contactList))
      this.contactListChangeEvent.emit()
    }
  }


  editContact(contactData: ContactInterface){
    const storage = localStorage.getItem(this.CONTACT_LIST)
    if(storage){
      const contactList: ContactInterface[] = JSON.parse(storage) 
      const contactIndex = contactList.findIndex(contact=>contact.id  == contactData.id  )
      
      contactList[contactIndex].contactName = contactData.contactName
      contactList[contactIndex].phoneNumber = contactData.phoneNumber
      
      localStorage.setItem(this.CONTACT_LIST, JSON.stringify(contactList))
      this.contactListChangeEvent.emit()
    }

  }




  openEditContactForm(contactData: ContactInterface){
    this.openEditContactFormEvent.emit(contactData)
  }














  getContactList(): ContactInterface[] | null{
    const storage = localStorage.getItem(this.CONTACT_LIST)
    if(storage){
      return JSON.parse(storage)
    }else {
      return null
    }
  }



  deleteContact(contactData: ContactInterface):void{
    const storage: string | null = localStorage.getItem(this.CONTACT_LIST)
    if(storage){
      const contactList: ContactInterface[] = JSON.parse(storage)
      const newcontactList: ContactInterface[]| [] = contactList.filter(contact => contact.id !== contactData.id )
      console.log(newcontactList)
      localStorage.setItem(this.CONTACT_LIST, JSON.stringify(newcontactList))
      
      this.contactListChangeEvent.emit()
    }
  }





}

