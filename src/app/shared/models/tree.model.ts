import { DecisionNode } from "./decision-node.model";

export interface Tree {
  trunk: DecisionNode,
  branch: DecisionNode;
  root: DecisionNode;
}
