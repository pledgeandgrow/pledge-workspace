export interface PartyInfo {
  type: "company" | "individual";
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  representative?: string;
  representativeTitle?: string;
  siret?: string;
}

export interface ConfidentialityScope {
  purpose: string;
  confidentialInfoDescription: string;
  excludedInfo: string;
  duration: {
    value: number;
    unit: "months" | "years";
  };
  startDate: string;
  territorialScope: string;
}

export interface Obligations {
  disclosureRestrictions: string;
  protectionMeasures: string;
  returnOfInfo: string;
  notificationRequirements: string;
}

export interface LegalTerms {
  applicableLaw: string;
  disputeResolution: string;
  penalties: string;
  forceMajeure: string;
  entireAgreement: string;
  amendments: string;
  severability: string;
  additionalClauses: string;
}

export interface ContratDeConfidentialite {
  reference: string;
  date: string;
  disclosingParty: PartyInfo;
  receivingParty: PartyInfo;
  reciprocal: boolean;
  scope: ConfidentialityScope;
  obligations: Obligations;
  legalTerms: LegalTerms;
}
