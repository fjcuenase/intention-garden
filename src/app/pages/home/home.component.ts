import { Component, ElementRef, ViewChild } from '@angular/core';
import {gsap} from 'gsap';
import { BranchComponent } from "../../shared/garden/branch/branch.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BranchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
