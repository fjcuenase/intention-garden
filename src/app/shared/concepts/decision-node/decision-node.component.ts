import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  OnInit
} from '@angular/core';
import { DecisionNode } from './models/decision-node.model';
import { gsap } from 'gsap';

@Component({
  selector: 'app-decision-node',
  standalone: true,
  imports: [],
  templateUrl: './decision-node.component.html',
  styleUrl: './decision-node.component.scss',
})
export class DecisionNodeComponent implements AfterViewInit {
  @Input() node!: DecisionNode;

  @ViewChild('nodeRef', { static: true }) nodeRef!: ElementRef;
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  @ViewChildren(DecisionNodeComponent)
  childrenNodes!: QueryList<DecisionNodeComponent>;

  selfCoord = { x: 0, y: 0 };
  childCoords: { x: number; y: number }[] = [];

  ngAfterViewInit(): void {
    this.animateSelf();
    setTimeout(() => this.updateLinePositions(), 0); // wait for children to render
  }

  animateSelf() {
    gsap.fromTo(
      this.nodeRef.nativeElement,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: this.node.level * 0.3,
      }
    );
  }
  updateLinePositions() {
    const nodeEl = this.nodeRef.nativeElement as HTMLElement;
    const containerEl = this.containerRef.nativeElement as HTMLElement;

    const nodeRect = nodeEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    this.selfCoord = {
      x: nodeRect.left - containerRect.left + nodeRect.width / 2,
      y: nodeRect.top - containerRect.top + nodeRect.height,
    };

    this.childCoords = this.childrenNodes.map((child) => {
      const childRect = child.nodeRef.nativeElement.getBoundingClientRect();
      return {
        x: childRect.left - containerRect.left + childRect.width / 2,
        y: childRect.top - containerRect.top,
      };
    });
  }
}
