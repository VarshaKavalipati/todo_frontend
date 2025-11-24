export interface Task {
  id?: number;   // optional because new tasks won’t have id yet
  title: string;
  completed?: boolean; // we will use this for strike-through in UI
}
