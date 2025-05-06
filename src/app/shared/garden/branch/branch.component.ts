import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FlowerComponent } from '../flower/flower.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [FlowerComponent],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss',
})
export class BranchComponent {
  @ViewChildren(FlowerComponent) flowers!: QueryList<FlowerComponent>;

  ngAfterViewInit(): void {
    const timeline = gsap.timeline({ delay: 0.5 });

    this.flowers.forEach((flower, index) => {
      timeline.fromTo(
        flower.element.nativeElement,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: index === 0 ? 0 : 0.1, // for spacing
        },
        `+=${index * 0.2}` // spacing between animations
      );
    });
  }
}
