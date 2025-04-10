
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  teams: string[];
  projects: string[];
};

export type RelevanceScore = 'high' | 'medium' | 'low';

export type Meeting = {
  id: string;
  subject: string;
  organizer: string;
  organizerEmail: string;
  dateTime: string;
  duration: number; // in minutes
  location: string;
  description: string;
  attendees: string[];
  relevanceScore: RelevanceScore;
  relevanceReason: string;
  tags: string[];
  isAccepted?: boolean;
  isDeclined?: boolean;
  isArchived?: boolean;
};
