export interface Score {
  uid: string;
  value: number;
  name?: string;
  photo_url?: string;
  puzzle: string;
  timestamp: number;
  when_created?: number;
  when_created_text?: string;
}
