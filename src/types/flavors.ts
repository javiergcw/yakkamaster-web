export enum Flavor {
  SPORT = 'sport',
  LABOUR = 'labour',
  HOSPITALITY = 'hospitality'
}

export interface FlavorConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  title: string;
  subtitle: string;
  welcomeText: string;
  // Banner search
  bannerImage: string;
  searchTitle: string;
  searchSubtitle: string;
  searchPlaceholder: string;
  locationPlaceholder: string;
  filterText: string;
  suggestionChips: string[];
  // Jobs section
  jobsTitle: string;
  jobsSubtitle: string;
  jobTypeColors: {
    fullTime: string;
    partTime: string;
    remote: string;
    contract: string;
  };
  // Job detail banner
  jobBannerImage: string;
  jobTitle: string;
  jobCompany: string;
  jobLocation: string;
  jobDatePosted: string;
  // Job detail content
  jobDescription: string;
  jobResponsibilities: string[];
  jobRequirements: string[];
  jobSalary: string;
  jobIndustry: string;
  jobEmploymentType: string;
  jobFunctions: string;
  // Doctor profile
  aiSummaryTitle: string;
}

export const flavorConfigs: Record<Flavor, FlavorConfig> = {
  [Flavor.SPORT]: {
    name: 'Sport',
    primaryColor: '#FF6B35', 
    secondaryColor: '#004E89', 
    accentColor: '#FFD23F', 
    backgroundColor: '#F8F9FA',
    textColor: '#2C3E50',
    buttonColor: '#FF6B35',
    buttonHoverColor: '#E55A2B',
    title: 'Yakka Sport',
    subtitle: 'Sports industry careers',
    welcomeText: 'Welcome to the sports industry! Find jobs in sports management, coaching, fitness and athletic services.',
    // Banner search
    bannerImage: '/bartender_pro.webp',
    searchTitle: 'Find your next sports industry job',
    searchSubtitle: 'Discover career opportunities in sports management, coaching, fitness training and athletic services',
    searchPlaceholder: 'Sports job, company or position you are looking for...',
    locationPlaceholder: 'Work location',
    filterText: 'Full Time',
    suggestionChips: ['Sports Coach', 'Fitness Trainer', 'Sports Manager', 'Athletic Director', 'Sports Marketing', 'Sports Medicine'],
    // Jobs section
    jobsTitle: 'Sports Industry Opportunities',
    jobsSubtitle: 'Explore exciting careers in sports, fitness, and athletic services',
    jobTypeColors: {
      fullTime: '#FF6B35',
      partTime: '#004E89',
      remote: '#FFD23F',
      contract: '#666666'
    },
    // Job detail banner
    jobBannerImage: '/bartender_pro.webp',
    jobTitle: 'Sports Marketing Manager',
    jobCompany: 'Nike Inc.',
    jobLocation: 'Los Angeles, USA',
    jobDatePosted: '14 hours ago',
    // Job detail content
    jobDescription: 'The company is described as one of the largest digital media publishers globally, producing entertaining and enlightening online content for over 1 billion subscribers. It is behind popular channels like "5-Minute Crafts" (DIY), "Bright Side" (inspirational and creative), and other channels across YouTube, Facebook, and Instagram. The company has a 17-year history, offices in 4 countries, and a global team of 2,100 creative minds, with continuous growth.',
    jobResponsibilities: [
      'Ensuring continuous content placement on YouTube, Facebook, and TikTok pages, adhering to the agreed strategy with the manufacturer.',
      'Preparation of various materials for publication, including videos, titles, video covers, announcements, descriptions, tags, and keywords.',
      'Community engagement, which involves monitoring comments on pages, communicating in comments and live chats, and preparing and publishing materials within the community.',
      'Analysis of content performance across all sites, including regular preparation of performance reports and discussions with managers.',
      'Conducting small experiments, either at the producer\'s request or independently, with examples given such as changing geolocation or writing titles in Spanish.'
    ],
    jobRequirements: [
      'Previous experience in sports marketing or digital content management',
      'Deep knowledge of social platforms (YouTube, Facebook, TikTok)',
      'Analytical skills to interpret performance metrics',
      'Creativity and ability to generate engaging content',
      'Experience in online community management'
    ],
    jobSalary: ' $135,700',
    jobIndustry: 'Software and hardware',
    jobEmploymentType: 'Full-time',
    jobFunctions: 'Information technology',
    // Doctor profile
    aiSummaryTitle: 'AI SUMMARY'
  },
  [Flavor.LABOUR]: {
    name: 'Labour',
    primaryColor: '#2E7D32', 
    secondaryColor: '#1976D2', 
    accentColor: '#FFC107', 
    backgroundColor: '#FAFAFA',
    textColor: '#212121',
    buttonColor: '#2E7D32',
    buttonHoverColor: '#1B5E20',
    title: 'Yakka Labour',
    subtitle: 'Connect with job opportunities',
    welcomeText: 'Welcome to the world of work! Find jobs, connect with employers and develop your career.',
    // Banner search
    bannerImage: '/bartender pro.webp',
    searchTitle: 'Find your next ideal job',
    searchSubtitle: 'Discover professional opportunities that boost your growth and career development',
    searchPlaceholder: 'Position, company or sector you are looking for...',
    locationPlaceholder: 'Work city or region',
    filterText: 'Full Time',
    suggestionChips: ['Web Development', 'Digital Marketing', 'UX/UI Design', 'Data Analysis', 'Sales', 'Administration'],
    // Jobs section
    jobsTitle: 'Professional Opportunities',
    jobsSubtitle: 'Discover diverse career paths across all industries and sectors',
    jobTypeColors: {
      fullTime: '#2E7D32',
      partTime: '#1976D2',
      remote: '#FFC107',
      contract: '#666666'
    },
    // Job detail banner
    jobBannerImage: '/bartender_pro.webp',
    jobTitle: 'Product Security Foundations',
    jobCompany: 'Microsoft Inc.',
    jobLocation: 'Los Angeles, USA',
    jobDatePosted: '14 hours ago',
    // Job detail content
    jobDescription: 'Microsoft is one of the largest technology companies in the world, producing innovative software and services for over 1 billion users. We are behind popular products like "Windows", "Office 365", "Azure" and other cloud services. The company has a 48-year history, offices in more than 100 countries, and a global team of 220,000 employees, with continuous growth in the technology sector.',
    jobResponsibilities: [
      'Develop and maintain security foundations for Microsoft products, ensuring data and system protection.',
      'Collaborate with development teams to implement security best practices in the software lifecycle.',
      'Conduct security audits and vulnerability assessments on existing and new products.',
      'Create technical documentation and security guides for internal teams and external partners.',
      'Participate in security incident response and implementation of corrective measures.'
    ],
    jobRequirements: [
      'Experience in cybersecurity and product security fundamentals',
      'Deep knowledge of Microsoft technologies (Azure, Windows, Office 365)',
      'Programming and code analysis skills',
      'Security certifications (CISSP, CISM, or equivalents)',
      'Experience in vulnerability management and incident response'
    ],
    jobSalary: '$145,000',
    jobIndustry: 'Software and hardware',
    jobEmploymentType: 'Full-time',
    jobFunctions: 'Information technology',
    // Doctor profile
    aiSummaryTitle: 'AI SUMMARY'
  },
  [Flavor.HOSPITALITY]: {
    name: 'Hospitality',
    primaryColor: '#7B1FA2', 
    secondaryColor: '#D32F2F', 
    accentColor: '#FF9800', 
    backgroundColor: '#FFF8E1',
    textColor: '#3E2723',
    buttonColor: '#7B1FA2',
    buttonHoverColor: '#6A1B9A',
    title: 'Yakka Hospitality',
    subtitle: 'Exceptional service experiences',
    welcomeText: 'Welcome to the world of hospitality! Connect with guests, create unique experiences and provide excellent service.',
    // Banner 
    bannerImage: '/bartender pro.webp',
    searchTitle: 'Find your next hospitality experience',
    searchSubtitle: 'Discover opportunities to create unforgettable moments and provide excellent service',
    searchPlaceholder: 'Hotel, restaurant or service you are looking for...',
    locationPlaceholder: 'Tourist destination or city',
    filterText: 'Full Time',
    suggestionChips: ['Hotel', 'Restaurant', 'Spa & Wellness', 'Events', 'Tourism', 'Gastronomy'],
    // Jobs section
    jobsTitle: 'Hospitality & Service Careers',
    jobsSubtitle: 'Create memorable experiences in hotels, restaurants, and tourism services',
    jobTypeColors: {
      fullTime: '#7B1FA2',
      partTime: '#D32F2F',
      remote: '#FF9800',
      contract: '#666666'
    },
    // Job detail banner
    jobBannerImage: '/bartender_pro.webp',
    jobTitle: 'Hotel Operations Manager',
    jobCompany: 'Marriott International',
    jobLocation: 'Miami, USA',
    jobDatePosted: '2 days ago',
    // Job detail content
    jobDescription: 'Marriott International is one of the largest hospitality companies in the world, operating luxury hotels and exceptional services for over 1 billion guests annually. We are behind popular brands like "Marriott", "Ritz-Carlton", "JW Marriott" and other hotels in more than 130 countries. The company has a 95-year history, more than 8,000 properties, and a global team of 1.2 million employees, with continuous growth in the hospitality sector.',
    jobResponsibilities: [
      'Supervise daily hotel operations, ensuring excellence standards in customer service.',
      'Manage teams from different departments (reception, housekeeping, restaurants, spa) to optimize guest experience.',
      'Implement and maintain quality procedures and world-class service standards.',
      'Collaborate with sales and marketing team to maximize occupancy and customer satisfaction.',
      'Develop and train staff to maintain high levels of service and hospitality.'
    ],
    jobRequirements: [
      'Previous experience in hotel management or hospitality operations',
      'Deep knowledge of hotel management systems (PMS, CRM)',
      'Leadership skills and multidisciplinary team management',
      'Experience in customer service and conflict resolution',
      'Hospitality certifications (CHM, CHA, or equivalents)'
    ],
    jobSalary: '$95,000',
    jobIndustry: 'Hospitality and tourism',
    jobEmploymentType: 'Full-time',
    jobFunctions: 'Hotel management',
    // Doctor profile
    aiSummaryTitle: 'AI SUMMARY'
  }
};
