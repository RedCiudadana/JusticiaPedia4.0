export interface NavItem {
  title: string;
  href: string;
}

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface InstitutionData {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  schedule?: string;
  workDays?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  mission?: string;
  vision?: string;
  sector?: string;
  enlaceAccesoInformacion?: string;
  enlaceGobiernoDigital?: string;
  enlaceDatosAbiertos?: string;
  enlaceServicios?: string;
  enlaceServicios2?: string;
  fb?: string;
  tw?: string;
  authorities?: {
    name: string;
    position: string;
    imageUrl?: string;
  }[];
  budget?: {
    year: number;
    amount: number;
    currency: string;
  }[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  honors?: string;
}

export interface Experience {
  position: string;
  institution: string;
  period: string;
  description: string;
}

export interface Publication {
  title: string;
  year: string;
  type: string;
  publisher: string;
}

export interface Award {
  title: string;
  year: string;
  institution: string;
}

export interface CandidateData {
  id: string;
  name: string;
  role: string;
  institution: string;
  imageUrl: string;
  description: string;
  status: 'Activo' | 'Inactivo' | 'Retirado';
  commissionId: string;
  specialization: string;
  yearsOfExperience: number;
  education: Education[];
  experience: Experience[];
  publications?: Publication[];
  awards?: Award[];
  languages: string[];
  certifications: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  // Additional fields from CSV
  candidateNumber?: string;
  gender?: string;
  department?: string;
  workStartDate?: string;
  barAssociationNumber?: string;
  maritalStatus?: string;
  profession?: string;
  yearsOfExperienceText?: string;
  professionalExperience?: string;
  academicExperience?: string;
  humanProjection?: string;
  sourceText?: string;
  sourceUrl?: string;
  cvUrl?: string;
  fileUrl?: string;
  summary?: string;
  commission?: string;
  election?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  role: string;
  institution: string;
  imageUrl: string;
  description: string;
}

export interface CommissionMember {
  name: string;
  role: string;
  institution: string;
  imageUrl?: string;
}

export interface CommissionPhase {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Pendiente' | 'En proceso' | 'Completada';
}

export interface CommissionDocument {
  title: string;
  url: string;
  type: string;
}

export interface CommissionData {
  id: string;
  name: string;
  purpose: string;
  description: string;
  type: string;
  status: 'Pendiente' | 'En proceso' | 'Finalizada';
  members: CommissionMember[];
  startDate: string;
  endDate: string;
  phases: CommissionPhase[];
  candidatesCount: number;
  positionsAvailable: number;
  requirements: string[];
  documents: CommissionDocument[];
  institution?: string;
  infografiaURL?: string;
  cronogramaURL?: string;
  fotoURL?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}