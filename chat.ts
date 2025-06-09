export interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  source?: string;
}

export interface SubjectType {
  id: string;
  name: string;
  description: string;
}