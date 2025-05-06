import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
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
  @ViewChildren(DecisionNodeComponent)
  childNodes!: QueryList<DecisionNodeComponent>;

  ngAfterViewInit(): void {
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
}
