// OSHA Form 300/301 Incident Record
export interface OSHAIncident {
  id: string;
  establishment_name: string;
  year_of_filing: number;
  case_number: number;
  job_title: string;
  date_of_incident: string;
  incident_location: string;
  incident_description: string;
  incident_outcome: number; // 1-6 mapping to outcome types
  dafw_num_away: number; // Days away from work
  djtr_num_tr: number; // Days of job transfer or restriction
  type_of_incident: number; // 1-6 mapping to incident types
  date_of_birth: string;
  date_of_hire: string;
  sex: string;
  treatment_facility_type: number;
  treatment_in_patient: number;
  time_started_work: string;
  time_of_incident: string;
  time_unknown: boolean;
  nar_before_incident: string; // What employee was doing
  nar_what_happened: string; // What happened
  nar_injury_illness: string; // Injury or illness description
  nar_object_substance: string; // Object/substance involved
  date_of_death?: string;
}

// OSHA Form 300A Annual Summary
export interface OSHA300ASummary {
  id: string;
  establishment_name: string;
  ein: string;
  company_name: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  naics_code: string;
  industry_description: string;
  size: number;
  establishment_type: number;
  year_filing_for: number;
  annual_average_employees: number;
  total_hours_worked: number;
  no_injuries_illnesses: number;
  total_deaths: number;
  total_dafw_cases: number;
  total_djtr_cases: number;
  total_other_cases: number;
  total_dafw_days: number;
  total_djtr_days: number;
  total_injuries: number;
  total_skin_disorders: number;
  total_respiratory_conditions: number;
  total_poisonings: number;
  total_hearing_loss: number;
  total_other_illnesses: number;
  change_reason?: string;
}

export const INCIDENT_OUTCOMES = {
  1: "Death",
  2: "Days away from work",
  3: "Job transfer or restriction",
  4: "Other recordable cases",
  5: "Privacy case",
  6: "Not recorded"
};

export const INCIDENT_TYPES = {
  1: "Injury",
  2: "Skin disorder",
  3: "Respiratory condition",
  4: "Poisoning",
  5: "Hearing loss",
  6: "All other illnesses"
};
