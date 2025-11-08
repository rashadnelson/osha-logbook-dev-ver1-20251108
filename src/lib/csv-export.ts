import { OSHAIncident, OSHA300ASummary } from "@/types/osha";

export const exportIncidentsToCSV = (incidents: OSHAIncident[]): void => {
  const headers = [
    "establishment_name",
    "year_of_filing",
    "case_number",
    "job_title",
    "date_of_incident",
    "incident_location",
    "incident_description",
    "incident_outcome",
    "dafw_num_away",
    "djtr_num_tr",
    "type_of_incident",
    "date_of_birth",
    "date_of_hire",
    "sex",
    "treatment_facility_type",
    "treatment_in_patient",
    "time_started_work",
    "time_of_incident",
    "time_unknown",
    "nar_before_incident",
    "nar_what_happened",
    "nar_injury_illness",
    "nar_object_substance",
    "date_of_death"
  ];

  const rows = incidents.map((incident) => [
    incident.establishment_name,
    incident.year_of_filing,
    incident.case_number,
    incident.job_title,
    incident.date_of_incident,
    incident.incident_location,
    incident.incident_description,
    incident.incident_outcome,
    incident.dafw_num_away,
    incident.djtr_num_tr,
    incident.type_of_incident,
    incident.date_of_birth,
    incident.date_of_hire,
    incident.sex,
    incident.treatment_facility_type,
    incident.treatment_in_patient,
    incident.time_started_work,
    incident.time_of_incident,
    incident.time_unknown ? 1 : "",
    incident.nar_before_incident,
    incident.nar_what_happened,
    incident.nar_injury_illness,
    incident.nar_object_substance,
    incident.date_of_death || ""
  ]);

  downloadCSV("osha-300-301-incidents.csv", headers, rows);
};

export const exportSummariesToCSV = (summaries: OSHA300ASummary[]): void => {
  const headers = [
    "establishment_name",
    "ein",
    "company_name",
    "street_address",
    "city",
    "state",
    "zip",
    "naics_code",
    "industry_description",
    "size",
    "establishment_type",
    "year_filing_for",
    "annual_average_employees",
    "total_hours_worked",
    "no_injuries_illnesses",
    "total_deaths",
    "total_dafw_cases",
    "total_djtr_cases",
    "total_other_cases",
    "total_dafw_days",
    "total_djtr_days",
    "total_injuries",
    "total_skin_disorders",
    "total_respiratory_conditions",
    "total_poisonings",
    "total_hearing_loss",
    "total_other_illnesses",
    "change_reason"
  ];

  const rows = summaries.map((summary) => [
    summary.establishment_name,
    summary.ein,
    summary.company_name,
    summary.street_address,
    summary.city,
    summary.state,
    summary.zip,
    summary.naics_code,
    summary.industry_description,
    summary.size,
    summary.establishment_type,
    summary.year_filing_for,
    summary.annual_average_employees,
    summary.total_hours_worked,
    summary.no_injuries_illnesses,
    summary.total_deaths,
    summary.total_dafw_cases,
    summary.total_djtr_cases,
    summary.total_other_cases,
    summary.total_dafw_days,
    summary.total_djtr_days,
    summary.total_injuries,
    summary.total_skin_disorders,
    summary.total_respiratory_conditions,
    summary.total_poisonings,
    summary.total_hearing_loss,
    summary.total_other_illnesses,
    summary.change_reason || ""
  ]);

  downloadCSV("osha-300a-summary.csv", headers, rows);
};

const downloadCSV = (filename: string, headers: string[], rows: any[][]): void => {
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => {
        if (typeof cell === "string" && (cell.includes(",") || cell.includes('"') || cell.includes("\n"))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};
