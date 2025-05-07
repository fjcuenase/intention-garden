import { Injectable } from '@angular/core';
import { MusicalNode } from '../models/musical-node.model';
import {DecisionNode} from '../models/decision-node.model';

@Injectable({
  providedIn: 'root',
})
export class DecisionNodeService {
  getMelodyPath(node: MusicalNode): string[] {
    const melody: string[] = [];
    let current: MusicalNode | undefined = node;
    while (current) {
      melody.unshift(current.note);
      current = current.parent as MusicalNode;
    }
    return melody;
  }

  isLeaf(node: DecisionNode): boolean {
    return !node.children || node.children.length === 0;
  }
}
