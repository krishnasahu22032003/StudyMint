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