import {Component, inject, OnInit} from '@angular/core';
import { DecisionNodeComponent } from '../decision-node/decision-node.component';
import {TreeGeneratorService} from '../../services/tree-generator.service';
import { MusicalNode } from '../../models/musical-node.model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [DecisionNodeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent implements OnInit {

  treeGen = inject(TreeGeneratorService);

  rootNode!: MusicalNode;

  ngOnInit() {
      this.rootNode = this.treeGen.enrichWithNotes(this.treeGen.generateTree(10));
  }
}
