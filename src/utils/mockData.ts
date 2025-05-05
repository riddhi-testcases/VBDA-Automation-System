import { faker } from '@faker-js/faker';
import { Recipient, EmailTemplate, EmailSequence, EmailCampaign, AnalyticsData, DailyStats } from '../types';

// Generate unique ID
export const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Generate mock recipients
export const generateMockRecipients = (count: number): Recipient[] => {
  const statuses: Array<'invited' | 'responded' | 'confirmed' | 'declined' | 'no-response'> = [
    'invited', 'responded', 'confirmed', 'declined', 'no-response'
  ];

  return Array(count).fill(null).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: generateId(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      organization: faker.company.name(),
      role: faker.person.jobTitle(),
      achievement: `${faker.finance.amount({ min: 10, max: 500 })}M ${faker.commerce.productName()} initiative`,
      source: faker.company.buzzNoun(),
      status,
      lastContactDate: status !== 'no-response' ? faker.date.recent({ days: 10 }).toISOString() : undefined,
      emailOpened: status !== 'no-response' && Math.random() > 0.3,
      emailClicked: status !== 'no-response' && status !== 'invited' && Math.random() > 0.5
    };
  });
};

// Generate mock email templates
export const generateMockTemplates = (): EmailTemplate[] => {
  const now = new Date().toISOString();
  
  return [
    {
      id: 'template-1',
      name: 'Initial Invitation',
      subject: '{FirstName}, Join Us at Viksit Bharat Dialogues & Awards 2025',
      body: `Dear {FirstName},

Your {Achievement}, announced in {Source}, is creating jobs and boosting India's economy. We admire your commitment to a stronger India, aligning with Viksit Bharat 2047.

The Bharat Economic Forum (BEF) invites you to the Viksit Bharat Dialogues & Awards (VBDA) on 25th July 2025 at Bharat Mandapam, New Delhi. VBDA celebrates leaders like you, uniting 500+ innovators and policymakers to shape a $30 trillion economy.

Participating in VBDA lets you network with CEOs and ministers, share your vision with 5M+ people via our media, and position {Organization} as a key contributor to India's growth. Be a speaker, VIP, or awardee to amplify your impact.

Can we schedule a 15-minute call to discuss your role in VBDA? Contact me at contact@bharateconomicforum.org or +91 8744089014. Visit https://www.bharateconomicforum.org/viksit-bharat-dialogues for details.

Warm regards,
Manish Patel
Founder & Chairman, BEF`,
      type: 'invitation',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'template-2',
      name: 'First Follow-up',
      subject: '{FirstName}, Don\'t Miss VBDA 2025!',
      body: `Dear {FirstName},

I'm following up on our invitation to the Viksit Bharat Dialogues & Awards (VBDA) on 25th July 2025. Your {Achievement} makes you a perfect fit to join 500+ leaders shaping India's $30T economy. With limited seats, don't miss networking with policymakers and gaining 5M+ media reach.

Let's discuss your participation in a quick call. Reach me at contact@bharateconomicforum.org or +91 8744089014.

Best,
Manish Patel
Founder & Chairman, BEF`,
      type: 'followup',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'template-3',
      name: 'Final Reminder',
      subject: '{FirstName}, Last Chance to Attend VBDA 2025!',
      body: `Dear {FirstName},

This is your final reminder about the Viksit Bharat Dialogues & Awards (VBDA) on 25th July 2025. With your impressive {Achievement} at {Organization}, your presence would be invaluable.

Only a few seats remain, and registration closes soon. Don't miss this exclusive opportunity to connect with India's top business leaders and policymakers shaping our $30T economy vision.

RSVP now by replying to this email or contacting us at contact@bharateconomicforum.org or +91 8744089014.

Regards,
Manish Patel
Founder & Chairman, BEF`,
      type: 'final-reminder',
      createdAt: now,
      updatedAt: now
    }
  ];
};

// Generate mock email sequences
export const generateMockSequences = (): EmailSequence[] => {
  const now = new Date().toISOString();
  
  return [
    {
      id: 'sequence-1',
      name: 'Standard VBDA Sequence',
      initialEmailId: 'template-1',
      followUpEmailId: 'template-2',
      finalReminderEmailId: 'template-3',
      followUpDays: 5,
      finalReminderDays: 10,
      createdAt: now,
      updatedAt: now
    }
  ];
};

// Generate mock campaigns
export const generateMockCampaigns = (): EmailCampaign[] => {
  const now = new Date().toISOString();
  
  return [
    {
      id: 'campaign-1',
      name: 'VBDA 2025 Initial Outreach',
      sequenceId: 'sequence-1',
      recipientCount: 250,
      sentCount: 250,
      openCount: 178,
      responseCount: 87,
      status: 'in-progress',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'campaign-2',
      name: 'VBDA 2025 VIP Outreach',
      sequenceId: 'sequence-1',
      recipientCount: 50,
      sentCount: 50,
      openCount: 42,
      responseCount: 28,
      status: 'in-progress',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'campaign-3',
      name: 'VBDA 2025 Speaker Outreach',
      sequenceId: 'sequence-1',
      recipientCount: 75,
      sentCount: 0,
      openCount: 0,
      responseCount: 0,
      status: 'draft',
      createdAt: now,
      updatedAt: now
    }
  ];
};

// Generate mock daily stats for analytics
const generateDailyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    stats.push({
      date: date.toISOString().split('T')[0],
      sent: Math.floor(Math.random() * 30) + 5,
      opened: Math.floor(Math.random() * 25) + 3,
      responded: Math.floor(Math.random() * 15) + 1
    });
  }
  
  return stats;
};

// Generate mock analytics data
export const generateMockAnalytics = (): AnalyticsData => {
  return {
    totalRecipients: 375,
    emailsSent: 300,
    emailsOpened: 220,
    responsesReceived: 115,
    rsvpConfirmed: 73,
    dailyStats: generateDailyStats()
  };
};