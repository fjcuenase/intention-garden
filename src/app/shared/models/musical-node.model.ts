import { DecisionNode } from './decision-node.model';

export interface MusicalNode extends DecisionNode {
  note: string;
}
