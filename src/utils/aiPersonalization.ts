// This file simulates AI personalization functionality

type PersonalizationProps = {
  firstName: string;
  lastName: string;
  organization: string;
  role: string;
  achievement: string;
  source?: string;
};

export const personalizeEmailSubject = (
  template: string,
  { firstName, lastName, organization }: PersonalizationProps
): string => {
  let result = template;
  
  // Replace placeholders with actual values
  result = result.replace(/\{FirstName\}/g, firstName);
  result = result.replace(/\{LastName\}/g, lastName);
  result = result.replace(/\{Organization\}/g, organization);
  
  return result;
};

export const personalizeEmailBody = (
  template: string,
  { firstName, lastName, organization, role, achievement, source }: PersonalizationProps
): string => {
  let result = template;
  
  // Replace placeholders with actual values
  result = result.replace(/\{FirstName\}/g, firstName);
  result = result.replace(/\{LastName\}/g, lastName);
  result = result.replace(/\{Organization\}/g, organization);
  result = result.replace(/\{Role\}/g, role);
  result = result.replace(/\{Achievement\}/g, achievement || 'contribution to India\'s growth');
  result = result.replace(/\{Source\}/g, source || 'recent news');
  
  return result;
};

export const generateAIHook = async (
  achievement: string,
  organization: string
): Promise<string> => {
  // In a real implementation, this would call an AI service API
  // For the prototype, we'll simulate AI-generated hooks
  
  const hooks = [
    `Your ${achievement} is a perfect example of innovation driving India's future economy.`,
    `Your leadership in ${achievement} aligns perfectly with our vision for a $30T Indian economy by 2047.`,
    `The impact of your ${achievement} on India's economic landscape is precisely what we aim to celebrate.`,
    `We're impressed by how ${organization}'s ${achievement} is contributing to India's economic transformation.`,
    `Your groundbreaking ${achievement} represents the kind of leadership India needs to reach $30T by 2047.`
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a random hook from the list
  return hooks[Math.floor(Math.random() * hooks.length)];
};

export const enhanceEmailWithAI = async (
  template: string,
  personalization: PersonalizationProps
): Promise<string> => {
  // First do basic personalization
  let personalizedEmail = personalizeEmailBody(template, personalization);
  
  // Simulate adding AI-generated hook at the beginning of the email
  try {
    const aiHook = await generateAIHook(
      personalization.achievement,
      personalization.organization
    );
    
    // Find the position after "Dear {FirstName}," to insert the AI hook
    const salutationRegex = new RegExp(`Dear ${personalization.firstName},\\s*\\n`);
    const match = personalizedEmail.match(salutationRegex);
    
    if (match && match.index !== undefined) {
      const insertPosition = match.index + match[0].length;
      personalizedEmail = 
        personalizedEmail.substring(0, insertPosition) + 
        `\n${aiHook}\n\n` + 
        personalizedEmail.substring(insertPosition);
    }
  } catch (error) {
    console.error('Error generating AI hook:', error);
    // If AI hook generation fails, continue with basic personalization
  }
  
  return personalizedEmail;
};