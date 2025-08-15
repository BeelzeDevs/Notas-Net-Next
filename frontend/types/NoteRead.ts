export interface NoteRead {
  id: number;
  title: string;
  content: string;
  filed: boolean;
  dateCreation: string;
  dateModification?: string | null;
}