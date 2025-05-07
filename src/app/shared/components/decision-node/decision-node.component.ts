import {
  Component,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  EventEmitter,
} from '@angular/core';
import { DecisionNode } from '../../models/decision-node.model';
import { gsap } from 'gsap';
import { AudioService } from '../../services/audio.service';
import { DecisionNodeService } from '../../services/decision-node.service';
import {MusicalNode} from '../../models/musical-node.model';

@Component({
  selector: 'app-decision-node',
  standalone: true,
  imports: [],
  templateUrl: './decision-node.component.html',
  styleUrl: './decision-node.component.scss',
})
export class DecisionNodeComponent implements AfterViewInit {
  constructor(
    private readonly audio: AudioService,
    private readonly nodeService: DecisionNodeService
  ) {}

  @Input() node!: MusicalNode;

  @ViewChild('nodeRef', { static: true }) nodeRef!: ElementRef;
  @ViewChildren(DecisionNodeComponent)
  childrenNodes!: QueryList<DecisionNodeComponent>;

  @Output()
  sendToTrunk = new EventEmitter<DecisionNode>();

  selfCoord = { x: 0, y: 0 };
  childCoords: { x: number; y: number }[] = [];

  ngAfterViewInit(): void {
    this.animateSelf();
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
        delay: 0.1,
      }
    );
  }

  isLeaf(): boolean {
    return this.nodeService.isLeaf(this.node);
  }

  async onLeafSelected() {
    const melody = this.nodeService.getMelodyPath(this.node);
    this.sendToTrunk.emit(this.node);
    await this.audio.playMelodyWithDepth(melody);
  }

  listenChildren(node: DecisionNode): void {
    if (this.nodeService.isLeaf(node)) {
      this.sendToTrunk.emit(this.node);
    }
  }

  get musicalChildren(): MusicalNode[] {
    return this.node.children as MusicalNode[];
  }
}
