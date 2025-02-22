export interface BooksProps {
  id: number;
  data: {
    fullName: string;
    // Add other properties if necessary
  };
  type: string;
  price: number;
  check: boolean;
  bookDate: string;
}

export interface CompanyDetailsProps {
  id: number;
  company_logo_src: string | null;
  companyName: string;
  companyWebLogo: string | null;
  fullName: string | null;
}
export interface SocialMediaProps {
  id: number; // Unique identifier for the social media
  platform: string; // Name of the social media platform (e.g., "Facebook", "Twitter")
  iconClass: string; // Class for the platform's icon (e.g., FontAwesome classes)
  link: string; // URL or contact information (nullable)
}
// Interface for hero_section
export interface HeroSectionProps {
  id: number;
  subtitle: string;
  backgroundImg: string;
  title: string;
  description: string;
  buttonText: string;
  buttonSrc: string;
  action: boolean;
}

// Interface for hero_section_media
export interface HeroSectionMediaProps {
  id: number;
  text: string;
  socialMediaId: number;
  social_links: SocialMediaProps;
}

// Interface for social_links
export interface SocialLinks {
  id: number;
  name: string;
  url: string;
}

export interface OperationsProps {
  id: number;
  title: string;
  description: string;
  place: number;
  action: boolean;
}
export interface OperationTitleProps {
  id: number;
  title: string;
  description: string;
  action: true;
}
export interface WhyUsProps {
  id: number;
  title: string;
  action: boolean;
}
export interface WhyUsFeaturesProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface FollowUsProps {
  id: number;
  title: string;
  action: boolean;
}

export interface FollowUsMediaProps {
  id: number;
  socialMediaId: number;
  social_links: SocialMediaProps;
}

export interface GoFormSectionProps {
  id: number;
  title: string;
  buttonText: string;
  action: boolean;
}

// About Page Props
export interface AboutUsSectionProps {
  id: number;
  title: string;
  description: string | null;
  imgSrc: string;
  action: boolean;
}

export interface PurposeSectionProps {
  id: number;
  title: string;
  description: string | null;
  catalog: object;
  action: boolean;
}

export interface OtherWorksSectionProps {
  id: number;
  backgroundImg: string;
  overlay: object;
  action: boolean;
}

// Price Page

export interface DocumentSelectionTitleProps {
  id: number;
  title: string;
  description: string | null;
}

export interface DocumentSelectionOrdersProps {
  id: number;
  title: string;
  buttonSrc: string;
}
// contact page
export interface ContactTitleProps {
  id: number;
  header: string;
  description: string;
  action: boolean;
}

export interface ContactPlatformsProps {
  id: number;
  socialMediaId: number;
  social_links: SocialMediaProps;
}

// ProfilePage
export interface Presentation {
  link: string;
  altText: string;
  imageSrc: string;
}

export interface ProfilePageProps {
  id: number;
  presentation: Presentation;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  options: any | null; // Can be adjusted if options have a known type
  placeholder: string | null;
}

export interface OrderFormsDataProps {
  id: number;
  title: string;
  data: FormField[];
  type: string;
}
export interface OrderFormsPriceProps {
  id: number;
  price: object;
  type: string;
}

export interface OrderFormsDefaultProps {
  id: number;
  modelText: string;
  wpNumber: string;
}

// Footer
export interface FooterSocialMediaProps {
  id: number;
  socialMediaId: number;
  social_links: SocialMediaProps;
}

export interface FooterTextProps {
  id: number;
  heading: string;
  logoImg: string;
  copyright: string;
  search_tools: string | null;
}
