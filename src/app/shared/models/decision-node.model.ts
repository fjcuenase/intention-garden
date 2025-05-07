export interface DecisionNode {
  id: string;
  children: DecisionNode[];
  parent?: DecisionNode;
}
