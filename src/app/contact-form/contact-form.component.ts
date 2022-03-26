import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactComponent } from '../contact/contact.component';
import { ContactInterface } from '../contact/Contact.interface';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit, OnChanges {
  @Input() editContactData?: ContactInterface | null
  @Output() closeContactFormEvent =  new EventEmitter()

  public contactForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {  
    this.contactForm = this.fb.group({
      contactName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
  });
}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.contactForm.controls['contactName'].setValue(this.editContactData?.contactName)
    this.contactForm.controls['phoneNumber'].setValue(this.editContactData?.phoneNumber)
    
  }



  addContact(): void{
    const contactData = this.contactForm.value
    this.storageService.addContact(contactData)
    this.closeContactForm()
  }

  editContact(): void{
    if(this.editContactData){
      const editContactData: ContactInterface ={
        id: this.editContactData?.id,
        contactName: this.contactForm.value.contactName,
        phoneNumber: this.contactForm.value.phoneNumber
      } 
      this.storageService.editContact(editContactData)
      this.closeContactForm()
    }
  }


  closeContactForm(): void{
    this.closeContactFormEvent.emit()
  }






}
