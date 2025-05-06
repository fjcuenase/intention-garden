import { Component, OnInit } from '@angular/core';
import { DecisionNode } from '../../concepts/decision-node/models/decision-node.model';
import { DecisionNodeComponent } from '../../concepts/decision-node/decision-node.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [DecisionNodeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent implements OnInit {
  ngOnInit() {
    this.assignParents(this.rootNode);
  }

  assignParents(node: DecisionNode, parent?: DecisionNode): void {
    node.parent = parent;
    for (const child of node.children || []) {
      this.assignParents(child, node);
    }
  }

  rootNode: DecisionNode = {
    id: 'level1',
    level: 1,
    note: 'C4',
    children: [
      {
        id: 'level2-a',
        level: 2,
        note: 'D4',
        children: [
          {
            id: 'level3-a1',
            level: 3,
            note: 'E4',
            children: [{ id: 'flower-a', level: 4, note: 'F4' }],
          },
          {
            id: 'level3-a2',
            level: 3,
            note: 'F4',
            children: [{ id: 'flower-b', level: 4, note: 'G4' }],
          },
        ],
      },
      {
        id: 'level2-b',
        level: 2,
        note: 'E4',
        children: [
          {
            id: 'level3-b1',
            level: 3,
            note: 'G4',
            children: [{ id: 'flower-c', level: 4, note: 'A4' }],
          },
        ],
      },
    ],
  };
}
