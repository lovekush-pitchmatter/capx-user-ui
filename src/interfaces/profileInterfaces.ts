export interface Profile {
  id: number;
  user_id: number;
  username: string;
  referral_code: string;
  image: string;
  cover_image: boolean;
  cover_image_url: string | null;
  profile_image_url: string;
  profile_visibility: "public" | "private";
  dob: string;
  profession: Profession;
  address: string;
  address_street: string;
  address_state: string;
  address_pin: string;
  address_country: Country;
  task_status: boolean;
  hobbies: Hobby[];
  preferred_contact_method: ContactMethod;
  networking_goals: NetworkingGoal[];
  skills: any;
  interest: any;
  bio: string;
  tag_line: string;
  hash_tags: string[];
  show_availability: boolean | null;
  inactive: boolean | null;
  social_medias: SocialMediaLinks;
  communication_status: boolean;
  social_status: boolean;
  schedules_link: string | null;
  general_link: string | null;
  pdf: string | null;
  note: string | null;
  languages: string[];
  services: string[];
  additionalwebsite: any[];
  payments: any[];
  awards: any[];
  design: any[];
  others: any[];
  recentConnections: any[];
  totalConnections: number;
  connectedAt: any;
  allstatus: any[];
  createdAt: string;
  updatedAt: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  is_verified: boolean;
  role: [];
  tagline: string | null;
  phone: string | null;
  portfolio: Portfolio[];
  recommendations: Recommendation[];
  education: Education[];
  experience: Experience[];
  courses: Course[];
  achievements: Achievement[];
  profile_completion_percentage: number;
  total_user_referred: number;
  total_user_tokens: number;
  user_token_details: any[];
  matchPercentage?: number;
  mutualFriends?: any[];
  mutualFriendsCount?: number;
  isLiked?: boolean;
  likesYou?: boolean;
  follower?: number;
  followerCount?: number;
  followingCount?: number;
  follows?: boolean;
  connectionsCount?: boolean;
  isConnected?: boolean;
  following?: boolean;
}

interface Profession {
  id: number;
  profession_name: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  created_by: number | null;
  updated_by: number | null;
  createdAt: string;
  updatedAt: string;
}

interface Country {
  id: number;
  country_name: string;
  country_code: string;
  iso_code: string;
  dial_code: string;
  currency: number;
  continent: string;
  is_active: boolean;
  flag_url: string;
  createdAt: string;
  updatedAt: string;
}

interface Hobby {
  id: number;
  hobby_name: string;
  hobby_code: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  created_by: number | null;
  updated_by: number | null;
  createdAt: string;
  updatedAt: string;
}

interface ContactMethod {
  id: number;
  method_name: string;
  description: string;
  is_active: boolean;
  icon: string;
  created_by: number | null;
  updated_by: number | null;
  createdAt: string;
  updatedAt: string;
}

interface NetworkingGoal {
  id: number;
  goal_name: string;
  description: string;
  is_active: boolean;
  icon: string;
  created_by: number | null;
  updated_by: number | null;
  createdAt: string;
  updatedAt: string;
}

interface Skill {
  id: number;
  skill_name: string;
  skill_code: string;
  description: string;
  is_active: boolean;
  icon: string;
  created_by: number | null;
  updated_by: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMediaLinks {
  [key: string]: string | undefined;
}

interface Portfolio {
  id: number;
  profile_id: number;
  title: string;
  portfolio_link: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Recommendation {
  id: number;
  profile_id: number;
  recommender_id: number;
  recommended_on: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Achievement {
  id: number;
  profile_id: number;
  title: string;
  category: string;
  organization: string;
  achievement_date: string;
  description: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  profile_id: number;
  title: string;
  university: string;
  start_date: string;
  end_date: string;
  photo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: number;
  profile_id: number;
  degree: string;
  institution: string;
  field_of_study: string;
  is_currently_studying_here: boolean;
  start_date: string;
  end_date: string;
  description: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  profile_id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_currently_working_here: boolean;
  description: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}
