import {
  Component,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  EventEmitter
} from '@angular/core';
import { DecisionNode } from '../../models/decision-node.model';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-decision-node',
  standalone: true,
  imports: [],
  templateUrl: './decision-node.component.html',
  styleUrl: './decision-node.component.scss',
})
export class DecisionNodeComponent implements AfterViewInit {
  constructor(private readonly audio: AudioService) {}
  @Input() node!: DecisionNode;

  @ViewChild('nodeRef', { static: true }) nodeRef!: ElementRef;
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  @ViewChildren(DecisionNodeComponent)
  childrenNodes!: QueryList<DecisionNodeComponent>;

  @Output()
  sendToTrunk = new EventEmitter<DecisionNode>();

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

  isLeaf(): boolean {
    return !this.node.children || this.node.children.length === 0;
  }

  getMelodyPath(node: DecisionNode): string[] {
    const melody: string[] = [];
    let current: DecisionNode | undefined = node;
    while (current) {
      melody.unshift(current.note); // prepende la nota
      current = current.parent;
    }
    return melody;
  }

  async onLeafSelected() {
    const melody = this.getMelodyPath(this.node);
    this.sendToTrunk.emit(this.node);

    // Original
    for (const note of melody) {
      await this.audio.playNote(note, '8n');
      await this.delay(200);
    }

    // Tronco (una octava abajo)
    for (const note of melody) {
      const lower = this.audio.transpose(note, -1);
      await this.audio.playNote(lower, '8n');
      await this.delay(200);
    }

    // Raíz (dos octavas abajo)
    for (const note of melody) {
      const deeper = this.audio.transpose(note, -2);
      await this.audio.playNote(deeper, '8n');
      await this.delay(200);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  listenChildren(node: DecisionNode): void {
    let isLeaf = !node.children || node.children.length === 0;
    if (isLeaf) {
      this.sendToTrunk.emit(this.node);
    }
  }
}
