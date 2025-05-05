export interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  achievement: string;
  source?: string;
  status: 'invited' | 'responded' | 'confirmed' | 'declined' | 'no-response';
  lastContactDate?: string;
  emailOpened?: boolean;
  emailClicked?: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'invitation' | 'followup' | 'final-reminder';
  createdAt: string;
  updatedAt: string;
}

export interface EmailSequence {
  id: string;
  name: string;
  initialEmailId: string;
  followUpEmailId?: string;
  finalReminderEmailId?: string;
  followUpDays: number;
  finalReminderDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  sequenceId: string;
  recipientCount: number;
  sentCount: number;
  openCount: number;
  responseCount: number;
  status: 'draft' | 'scheduled' | 'in-progress' | 'completed';
  startDate?: string;
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyStats {
  date: string;
  sent: number;
  opened: number;
  responded: number;
}

export interface AnalyticsData {
  totalRecipients: number;
  emailsSent: number;
  emailsOpened: number;
  responsesReceived: number;
  rsvpConfirmed: number;
  dailyStats: DailyStats[];
}