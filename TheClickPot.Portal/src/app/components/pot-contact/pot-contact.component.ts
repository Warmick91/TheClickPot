import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-pot-contact',
  imports: [Card, FormsModule, Button, IftaLabelModule, CommonModule],
  templateUrl: './pot-contact.component.html',
  styleUrl: './pot-contact.component.scss',
})
export class PotContactComponent {
  firstName = '';
  lastName = '';
  email = '';
  message = '';
  errorMessage = '';

  public sendMessage() {
    console.log('Sending message to mail...');
  }

  public cancel(messageForm: NgForm) {
    console.log('Cancelling message...');
    messageForm.reset();
    this.errorMessage = '';
  }
}
