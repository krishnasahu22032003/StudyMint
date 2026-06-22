export type NotesResult = {
  subTopics: {
    "⭐": string[];
    "⭐⭐": string[];
    "⭐⭐⭐": string[];
  };
  importance: string;
  notes: string;
  revisionPoints: string[];
  questions: {
    short: string[];
    long: string[];
    diagram: string;
  };
  diagram: {
    type: string;
    data: string;
  };
  charts: {
    type: "bar" | "line" | "pie";
    title: string;
    data: {
      name: string;
      value: number;
    }[];
  }[];
};

export type ChartData = {
  name: string;
  value: number;
};

export type NoteHistoryItem = {
  _id: string;
  topic: string;
  classLevel?: string;
  examType?: string;
  revisionMode: boolean;
  includeDiagram: boolean;
  includeChart: boolean;
  createdAt: string;
};

export type SingleNote = {
  _id: string;
  topic: string;
  classLevel?: string;
  examType?: string;
  revisionMode: boolean;
  includeDiagram: boolean;
  includeChart: boolean;
  createdAt: string;
  content: NotesResult;
};