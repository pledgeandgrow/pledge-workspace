export interface StudentInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  studyLevel: string;
  institution: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  siret: string;
  activityCode: string;
  representative: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
  };
}

export interface SupervisorInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
}

export interface InternshipInfo {
  startDate: string;
  endDate: string;
  duration: string;
  hoursPerWeek: number;
  schedule: string;
  location: string;
  department: string;
  subject: string;
  description: string;
  tasks: string;
  skills: string;
  compensation: {
    amount: number;
    frequency: "hourly" | "daily" | "weekly" | "monthly";
    benefits: string;
  };
  holidays: string;
}

export interface EducationalInfo {
  institution: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    representative: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
    };
  };
  supervisor: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
  };
  program: string;
  year: string;
  objectives: string;
  evaluation: string;
}

export interface ConventionDeStage {
  reference: string;
  date: string;
  studentInfo: StudentInfo;
  companyInfo: CompanyInfo;
  companySupervisor: SupervisorInfo;
  internshipInfo: InternshipInfo;
  educationalInfo: EducationalInfo;
  additionalClauses: string;
  signatures: {
    student: boolean;
    company: boolean;
    institution: boolean;
    date: string;
  };
}
