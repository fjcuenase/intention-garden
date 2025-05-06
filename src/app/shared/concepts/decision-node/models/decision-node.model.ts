export interface DecisionNode {
  id: string;
  level: number;
  note: string;
  children?: DecisionNode[];
}
