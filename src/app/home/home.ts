import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { Cta } from './cta/cta';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Hero,
    Features,
    Cta,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}