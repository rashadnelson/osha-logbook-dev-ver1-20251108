import { OSHAIncident, OSHA300ASummary } from "@/types/osha";

const INCIDENTS_KEY = "osha_incidents";
const SUMMARIES_KEY = "osha_summaries";

export const storage = {
  // Incidents
  getIncidents: (): OSHAIncident[] => {
    const data = localStorage.getItem(INCIDENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveIncident: (incident: OSHAIncident): void => {
    const incidents = storage.getIncidents();
    const existingIndex = incidents.findIndex((i) => i.id === incident.id);
    
    if (existingIndex >= 0) {
      incidents[existingIndex] = incident;
    } else {
      incidents.push(incident);
    }
    
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(incidents));
  },

  deleteIncident: (id: string): void => {
    const incidents = storage.getIncidents().filter((i) => i.id !== id);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(incidents));
  },

  // Summaries
  getSummaries: (): OSHA300ASummary[] => {
    const data = localStorage.getItem(SUMMARIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSummary: (summary: OSHA300ASummary): void => {
    const summaries = storage.getSummaries();
    const existingIndex = summaries.findIndex((s) => s.id === summary.id);
    
    if (existingIndex >= 0) {
      summaries[existingIndex] = summary;
    } else {
      summaries.push(summary);
    }
    
    localStorage.setItem(SUMMARIES_KEY, JSON.stringify(summaries));
  },

  deleteSummary: (id: string): void => {
    const summaries = storage.getSummaries().filter((s) => s.id !== id);
    localStorage.setItem(SUMMARIES_KEY, JSON.stringify(summaries));
  },
};
