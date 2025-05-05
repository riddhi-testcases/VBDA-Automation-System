import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { db } from '../config/firebase';
import { Recipient, EmailTemplate, EmailSequence, EmailCampaign, AnalyticsData } from '../types';

interface DataContextType {
  recipients: Recipient[];
  setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
  templates: EmailTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<EmailTemplate[]>>;
  sequences: EmailSequence[];
  setSequences: React.Dispatch<React.SetStateAction<EmailSequence[]>>;
  campaigns: EmailCampaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<EmailCampaign[]>>;
  analytics: AnalyticsData;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsData>>;
  addRecipients: (newRecipients: Recipient[]) => Promise<void>;
  addTemplate: (template: EmailTemplate) => Promise<void>;
  updateTemplate: (id: string, template: Partial<EmailTemplate>) => Promise<void>;
  addSequence: (sequence: EmailSequence) => Promise<void>;
  addCampaign: (campaign: EmailCampaign) => Promise<void>;
  updateCampaign: (id: string, updates: Partial<EmailCampaign>) => Promise<void>;
  getTemplateById: (id: string) => EmailTemplate | undefined;
  getSequenceById: (id: string) => EmailSequence | undefined;
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRecipients: 0,
    emailsSent: 0,
    emailsOpened: 0,
    responsesReceived: 0,
    rsvpConfirmed: 0,
    dailyStats: []
  });

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        // Clear data when user is not authenticated
        setRecipients([]);
        setTemplates([]);
        setSequences([]);
        setCampaigns([]);
        setAnalytics({
          totalRecipients: 0,
          emailsSent: 0,
          emailsOpened: 0,
          responsesReceived: 0,
          rsvpConfirmed: 0,
          dailyStats: []
        });
        setError('Please sign in to access data');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch recipients
      const recipientsSnapshot = await getDocs(collection(db, 'recipients'));
      const recipientsData = recipientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipient[];
      setRecipients(recipientsData);

      // Fetch templates
      const templatesSnapshot = await getDocs(collection(db, 'templates'));
      const templatesData = templatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmailTemplate[];
      setTemplates(templatesData);

      // Fetch sequences
      const sequencesSnapshot = await getDocs(collection(db, 'sequences'));
      const sequencesData = sequencesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmailSequence[];
      setSequences(sequencesData);

      // Fetch campaigns
      const campaignsSnapshot = await getDocs(collection(db, 'campaigns'));
      const campaignsData = campaignsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmailCampaign[];
      setCampaigns(campaignsData);

      // Fetch analytics
      const analyticsSnapshot = await getDocs(collection(db, 'analytics'));
      if (analyticsSnapshot.docs.length > 0) {
        setAnalytics(analyticsSnapshot.docs[0].data() as AnalyticsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please check your permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipients = async (newRecipients: Recipient[]) => {
    try {
      const recipientsRef = collection(db, 'recipients');
      for (const recipient of newRecipients) {
        await addDoc(recipientsRef, recipient);
      }
      setRecipients(prev => [...prev, ...newRecipients]);
    } catch (error) {
      console.error('Error adding recipients:', error);
      throw error;
    }
  };

  const addTemplate = async (template: EmailTemplate) => {
    try {
      const templatesRef = collection(db, 'templates');
      const docRef = await addDoc(templatesRef, template);
      setTemplates(prev => [...prev, { ...template, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding template:', error);
      throw error;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<EmailTemplate>) => {
    try {
      const templateRef = doc(db, 'templates', id);
      await updateDoc(templateRef, { ...updates, updatedAt: new Date().toISOString() });
      setTemplates(prev =>
        prev.map(template =>
          template.id === id ? { ...template, ...updates, updatedAt: new Date().toISOString() } : template
        )
      );
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  };

  const addSequence = async (sequence: EmailSequence) => {
    try {
      const sequencesRef = collection(db, 'sequences');
      const docRef = await addDoc(sequencesRef, sequence);
      setSequences(prev => [...prev, { ...sequence, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding sequence:', error);
      throw error;
    }
  };

  const addCampaign = async (campaign: EmailCampaign) => {
    try {
      const campaignsRef = collection(db, 'campaigns');
      const docRef = await addDoc(campaignsRef, campaign);
      setCampaigns(prev => [...prev, { ...campaign, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding campaign:', error);
      throw error;
    }
  };

  const updateCampaign = async (id: string, updates: Partial<EmailCampaign>) => {
    try {
      const campaignRef = doc(db, 'campaigns', id);
      await updateDoc(campaignRef, { ...updates, updatedAt: new Date().toISOString() });
      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === id ? { ...campaign, ...updates, updatedAt: new Date().toISOString() } : campaign
        )
      );
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  };

  const getTemplateById = (id: string) => {
    return templates.find(template => template.id === id);
  };

  const getSequenceById = (id: string) => {
    return sequences.find(sequence => sequence.id === id);
  };

  return (
    <DataContext.Provider value={{
      recipients,
      setRecipients,
      templates,
      setTemplates,
      sequences,
      setSequences,
      campaigns,
      setCampaigns,
      analytics,
      setAnalytics,
      addRecipients,
      addTemplate,
      updateTemplate,
      addSequence,
      addCampaign,
      updateCampaign,
      getTemplateById,
      getSequenceById,
      isLoading,
      error
    }}>
      {children}
    </DataContext.Provider>
  );
};