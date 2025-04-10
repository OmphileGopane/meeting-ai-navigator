
import { Meeting, RelevanceScore, User, TeamMember } from "@/types";

// Mock current user
export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.morgan@company.com",
  role: "API Platform Engineer",
  teams: ["API Governance", "Integration"],
  projects: ["Gateway Modernization", "API Security"],
};

// Mock team members
export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "API Architect",
    avatar: "SC",
    status: "online",
    teams: ["API Governance"],
  },
  {
    id: "tm2",
    name: "James Wilson",
    email: "james.wilson@company.com",
    role: "Senior Backend Developer",
    avatar: "JW",
    status: "away",
    teams: ["Integration"],
  },
  {
    id: "tm3",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    role: "Security Engineer",
    avatar: "MR",
    status: "offline",
    teams: ["API Security"],
  },
  {
    id: "tm4",
    name: "Jennifer Park",
    email: "jennifer.park@company.com",
    role: "Product Manager",
    avatar: "JP",
    status: "online",
    teams: ["API Governance", "Product"],
  },
];

// Mock meetings data with relevance scoring
export const meetings: Meeting[] = [
  {
    id: "m1",
    subject: "API Gateway Performance Review",
    organizer: "Sarah Chen",
    organizerEmail: "sarah.chen@company.com",
    dateTime: "2025-04-11T10:00:00Z",
    duration: 60,
    location: "Teams Meeting",
    description: "Quarterly review of API Gateway performance metrics. We'll discuss throughput, latency, error rates and plan optimizations for Q2.",
    attendees: ["alex.morgan@company.com", "sarah.chen@company.com", "james.wilson@company.com"],
    relevanceScore: "high",
    relevanceReason: "You're leading the Gateway Modernization project and this meeting directly impacts your current sprint goals.",
    tags: ["API Governance", "Gateway Modernization", "Performance"],
  },
  {
    id: "m2",
    subject: "OAuth 2.0 Implementation Planning",
    organizer: "Michael Rodriguez",
    organizerEmail: "michael.rodriguez@company.com",
    dateTime: "2025-04-12T14:30:00Z",
    duration: 45,
    location: "Teams Meeting",
    description: "Planning session for implementing OAuth 2.0 with PKCE for all public APIs. Security team will present requirements.",
    attendees: ["alex.morgan@company.com", "michael.rodriguez@company.com", "security-team@company.com"],
    relevanceScore: "high",
    relevanceReason: "Directly relates to your API Security project and requires your expertise on the Gateway architecture.",
    tags: ["API Security", "OAuth", "Planning"],
  },
  {
    id: "m3",
    subject: "Monthly All-Hands Meeting",
    organizer: "Jennifer Park",
    organizerEmail: "jennifer.park@company.com",
    dateTime: "2025-04-15T09:00:00Z",
    duration: 90,
    location: "Main Conference Room + Teams",
    description: "Monthly company all-hands meeting. Updates from all departments and Q&A session with leadership.",
    attendees: ["all-staff@company.com"],
    relevanceScore: "medium",
    relevanceReason: "General company updates with some potential mentions of API strategy that could affect your projects.",
    tags: ["Company", "All-Hands"],
  },
  {
    id: "m4",
    subject: "Frontend Dev Team Sync",
    organizer: "David Kim",
    organizerEmail: "david.kim@company.com",
    dateTime: "2025-04-13T11:00:00Z",
    duration: 30,
    location: "Teams Meeting",
    description: "Weekly sync with the frontend development team to discuss UI components and styling standards.",
    attendees: ["frontend-team@company.com", "alex.morgan@company.com"],
    relevanceScore: "low",
    relevanceReason: "While you're included as an optional attendee, this is primarily focused on UI components unrelated to your current projects.",
    tags: ["Frontend", "Weekly Sync"],
  },
  {
    id: "m5",
    subject: "API Documentation Standardization",
    organizer: "Laura Johnson",
    organizerEmail: "laura.johnson@company.com",
    dateTime: "2025-04-16T13:00:00Z",
    duration: 60,
    location: "Teams Meeting",
    description: "Discussion on standardizing API documentation across all teams. Reviewing OpenAPI specifications and documentation platforms.",
    attendees: ["api-team@company.com", "docs-team@company.com"],
    relevanceScore: "high",
    relevanceReason: "As part of API Governance, your input on documentation standards is crucial for this initiative.",
    tags: ["API Governance", "Documentation", "Standards"],
  },
  {
    id: "m6",
    subject: "Sales Team Introduction to New Products",
    organizer: "Robert Smith",
    organizerEmail: "robert.smith@company.com",
    dateTime: "2025-04-18T15:00:00Z",
    duration: 120,
    location: "Marketing Conference Room",
    description: "Training session for sales team on new product features and how to demo them to potential clients.",
    attendees: ["sales-team@company.com", "product-team@company.com", "alex.morgan@company.com"],
    relevanceScore: "low",
    relevanceReason: "You were added as an optional technical resource, but this is a sales training session with minimal technical content.",
    tags: ["Sales", "Training", "Product"],
  },
];

// Group meetings by relevance score
export const getGroupedMeetings = () => {
  return {
    highRelevance: meetings.filter(m => m.relevanceScore === 'high'),
    mediumRelevance: meetings.filter(m => m.relevanceScore === 'medium'),
    lowRelevance: meetings.filter(m => m.relevanceScore === 'low'),
  };
};

// Get meeting by ID
export const getMeeting = (id: string): Meeting | undefined => {
  return meetings.find(m => m.id === id);
};

// Get meetings by status
export const getMeetingsByStatus = (status: { 
  isAccepted?: boolean, 
  isDeclined?: boolean, 
  isArchived?: boolean 
}): Meeting[] => {
  return meetings.filter(meeting => {
    let match = true;
    
    if (status.isAccepted !== undefined) {
      match = match && meeting.isAccepted === status.isAccepted;
    }
    
    if (status.isDeclined !== undefined) {
      match = match && meeting.isDeclined === status.isDeclined;
    }
    
    if (status.isArchived !== undefined) {
      match = match && meeting.isArchived === status.isArchived;
    }
    
    return match;
  });
};

// Get team members by team
export const getTeamMembersByTeam = (team?: string): TeamMember[] => {
  if (!team) {
    return teamMembers;
  }
  return teamMembers.filter(member => member.teams.includes(team));
};

// Update meeting status
export const updateMeetingStatus = (id: string, status: { isAccepted?: boolean, isDeclined?: boolean, isArchived?: boolean }) => {
  const index = meetings.findIndex(m => m.id === id);
  
  if (index !== -1) {
    meetings[index] = {
      ...meetings[index],
      ...status
    };
    return meetings[index];
  }
  
  return undefined;
};

// Restore archived meeting
export const restoreArchivedMeeting = (id: string) => {
  const index = meetings.findIndex(m => m.id === id);
  
  if (index !== -1 && meetings[index].isArchived) {
    meetings[index] = {
      ...meetings[index],
      isArchived: false
    };
    return meetings[index];
  }
  
  return undefined;
};

// Calculate stats
export const getStats = () => {
  const totalMeetings = meetings.length;
  const acceptedMeetings = meetings.filter(m => m.isAccepted).length;
  const declinedMeetings = meetings.filter(m => m.isDeclined).length;
  const pendingMeetings = meetings.filter(m => !m.isAccepted && !m.isDeclined && !m.isArchived).length;
  
  // Calculate time saved by declining low relevance meetings
  const declinedMinutes = meetings
    .filter(m => m.isDeclined)
    .reduce((total, meeting) => total + meeting.duration, 0);
  
  const timeSaved = Math.round(declinedMinutes / 60);

  return {
    totalMeetings,
    acceptedMeetings,
    declinedMeetings,
    pendingMeetings,
    timeSaved
  };
};
