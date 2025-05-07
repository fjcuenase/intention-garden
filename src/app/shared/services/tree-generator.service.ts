import {Injectable} from '@angular/core';
import {DecisionNode} from '../models/decision-node.model';
import {MusicalNode} from '../models/musical-node.model';

@Injectable({ providedIn: 'root' })
export class TreeGeneratorService {
  private readonly notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

  generateDecisionTree(steps: number): DecisionNode {
    const createNode = (level: number, parent?: DecisionNode, path: string = ''): DecisionNode => {
      const id = `step-${level}${path ? '-' + path : ''}`;

      const node: DecisionNode = {
        id,
        children: [],
        parent,
      };

      if (level >= steps) {
        return node; // es una hoja
      }

      // Creamos dos ramas por cada decisión: "a" y "b"
      const left = createNode(level + 1, node, path + 'a');
      const right = createNode(level + 1, node, path + 'b');

      node.children.push(left, right);

      return node;
    };

    return createNode(1); // empieza en nivel 1
  }


  enrichWithNotes(root: DecisionNode): MusicalNode {
    const enrich = (node: DecisionNode, level: number): MusicalNode => {
      const note = this.notes[(level - 1) % this.notes.length];
      return {
        ...node,
        note,
        children: node.children.map((child) => enrich(child, level + 1)),
      };
    };

    return enrich(root, 1);
  }
}
