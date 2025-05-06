import { Component, ElementRef, ViewChild } from '@angular/core';
import {gsap} from 'gsap';
import { TreeComponent } from "../../shared/garden/tree/tree.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
