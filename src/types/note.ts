interface NoteTag {
  tag: string | "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface Note extends NoteTag {
  title: string;
  content: string;
}

export interface NoteResponse extends Note {
  id: number;
}
