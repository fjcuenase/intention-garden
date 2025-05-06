import { Component, ElementRef, ViewChild } from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('titulo') titulo!: ElementRef;

  ngAfterViewInit() {
    gsap.to(this.titulo.nativeElement, {
      duration: 1,
      opacity: 1,
      y: 20,
      ease: 'power2.out',
    });
  }
}
