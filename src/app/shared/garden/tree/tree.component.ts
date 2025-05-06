import {
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BranchComponent } from '../branch/branch.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [BranchComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent {
  @ViewChildren(BranchComponent) branches!: QueryList<BranchComponent>;

  ngAfterViewInit(): void {
    const masterTimeline = gsap.timeline({ delay: 0.5 });

    this.branches.forEach((branch, index) => {
      const branchElement = branch.element.nativeElement;

      masterTimeline.fromTo(
        branchElement,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        `+=${index * 0.3}` // staggers each branch
      );
    });
  }
}
