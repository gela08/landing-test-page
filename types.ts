
export interface Feature {
  title: string;
  description: string;
  iconName: 'Zap' | 'Shield' | 'BarChart' | 'Cpu' | 'Globe' | 'Users';
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface LandingPageContent {
  headline: string;
  subheadline: string;
  features: Feature[];
  testimonial: Testimonial;
  ctaText: string;
  accentColor: string;
}

export interface GeneratorState {
  isLoading: boolean;
  error: string | null;
  content: LandingPageContent | null;
  heroImageUrl: string | null;
}
