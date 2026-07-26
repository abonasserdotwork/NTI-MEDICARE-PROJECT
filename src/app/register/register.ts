import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// ReactiveFormsModule make app read reactive form 
// form group track the value and validity of the form input 
// help creating formGroup faster => less code 
// validator check the user input if it correct 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeTerms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      alert("Registerd successfully");
    }
    else {
      this.registerForm.markAllAsTouched;
    }
  }
}
