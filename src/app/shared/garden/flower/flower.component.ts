import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-flower',
  standalone: true,
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],
})
export class FlowerComponent implements AfterViewInit {
  @ViewChild('flower', { static: true }) flower!: ElementRef;

  ngAfterViewInit() {
    gsap.fromTo(
      this.flower.nativeElement,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
      }
    );
  }
}
