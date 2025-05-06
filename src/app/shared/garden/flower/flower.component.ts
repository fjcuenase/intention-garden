import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-flower',
  standalone: true,
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],
})
export class FlowerComponent {
  @ViewChild('flower', { static: true }) flowerRef!: ElementRef;

  @Input() emoji: string = '🌸';

  get element() {
    return this.flowerRef;
  }
}
