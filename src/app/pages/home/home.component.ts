import { Component, ElementRef, ViewChild } from '@angular/core';
import {gsap} from 'gsap';
import { FlowerComponent } from '../../shared/garden/flower/flower.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlowerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
