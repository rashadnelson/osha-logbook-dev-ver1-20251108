/**
 * Prisma Database Seed Script
 * 
 * This script populates the Neon Postgres database with sample OSHA incident data
 * for development and testing purposes.
 * 
 * Usage:
 *   npm run db:seed
 * 
 * Requirements:
 *   - DATABASE_URL must be set in .env
 *   - Prisma client must be generated (npm run db:generate)
 *   - Database schema must be pushed/migrated (npm run db:push)
 * 
 * @module prisma/seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Main seed function
 * Populates database with sample OSHA incidents and summaries
 */
async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out if you want to preserve data)
  console.log('🗑️  Clearing existing data...');
  await prisma.oSHAIncident.deleteMany({});
  await prisma.oSHA300ASummary.deleteMany({});

  // Seed sample incidents
  console.log('📝 Creating sample incidents...');
  
  const incident1 = await prisma.oSHAIncident.create({
    data: {
      establishment_name: "Manufacturing Plant 1",
      year_of_filing: 2024,
      case_number: 1,
      job_title: "Machine Operator",
      date_of_birth: "05/15/1985",
      date_of_hire: "03/20/2018",
      sex: "M",
      date_of_incident: "08/12/2024",
      time_of_incident: "14:30",
      time_started_work: "07:00",
      time_unknown: false,
      incident_location: "Production Line A",
      incident_description: "Laceration to right hand while operating cutting machine",
      incident_outcome: 2, // Days away from work
      dafw_num_away: 5,
      djtr_num_tr: 0,
      type_of_incident: 1, // Injury
      treatment_facility_type: 1, // Emergency Room
      treatment_in_patient: 0,
      nar_before_incident: "Employee was operating the cutting machine to trim metal sheets for assembly.",
      nar_what_happened: "While adjusting the cutting blade guard, the employee's hand slipped and came into contact with the moving blade, resulting in a deep laceration.",
      nar_injury_illness: "Deep laceration to the palm of the right hand requiring 12 stitches. No tendon damage.",
      nar_object_substance: "Industrial cutting machine blade (Model XC-2000)",
    },
  });

  const incident2 = await prisma.oSHAIncident.create({
    data: {
      establishment_name: "Manufacturing Plant 1",
      year_of_filing: 2024,
      case_number: 2,
      job_title: "Warehouse Supervisor",
      date_of_birth: "11/08/1978",
      date_of_hire: "01/10/2015",
      sex: "F",
      date_of_incident: "09/25/2024",
      time_of_incident: "11:15",
      time_started_work: "08:00",
      time_unknown: false,
      incident_location: "Warehouse Storage Area",
      incident_description: "Lower back strain while lifting heavy boxes",
      incident_outcome: 3, // Job transfer or restriction
      dafw_num_away: 0,
      djtr_num_tr: 10,
      type_of_incident: 1, // Injury
      treatment_facility_type: 2, // Doctor's Office
      treatment_in_patient: 0,
      nar_before_incident: "Employee was supervising warehouse inventory and assisting with moving heavy shipping boxes.",
      nar_what_happened: "While lifting a 50-pound box from a low shelf without proper lifting technique, employee felt sudden pain in lower back.",
      nar_injury_illness: "Acute lower back strain/sprain. Restricted from lifting over 10 pounds for 2 weeks.",
      nar_object_substance: "Shipping box containing metal components (approximately 50 lbs)",
    },
  });

  const incident3 = await prisma.oSHAIncident.create({
    data: {
      establishment_name: "Manufacturing Plant 1",
      year_of_filing: 2024,
      case_number: 3,
      job_title: "Maintenance Technician",
      date_of_birth: "03/22/1990",
      date_of_hire: "06/15/2020",
      sex: "M",
      date_of_incident: "10/05/2024",
      time_of_incident: "16:00",
      time_started_work: "07:30",
      time_unknown: false,
      incident_location: "Equipment Room",
      incident_description: "Chemical exposure to eyes from cleaning solution",
      incident_outcome: 4, // Other recordable case
      dafw_num_away: 0,
      djtr_num_tr: 0,
      type_of_incident: 4, // Poisoning
      treatment_facility_type: 1, // Emergency Room
      treatment_in_patient: 0,
      nar_before_incident: "Employee was cleaning equipment using industrial degreasing solution.",
      nar_what_happened: "Container of cleaning solution was knocked over, splashing chemical directly into employee's eyes.",
      nar_injury_illness: "Chemical irritation to both eyes. Flushed at emergency eyewash station. No permanent damage.",
      nar_object_substance: "Industrial degreasing solution (brand: CleanMax Pro)",
    },
  });

  console.log(`✅ Created ${3} sample incidents`);

  // Seed sample annual summary
  console.log('📊 Creating sample annual summary...');
  
  const summary = await prisma.oSHA300ASummary.create({
    data: {
      establishment_name: "Manufacturing Plant 1",
      ein: "12-3456789",
      company_name: "ABC Manufacturing Corporation",
      street_address: "1234 Industrial Way",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      naics_code: "332710",
      industry_description: "Machine Shops",
      size: 3, // 51-250 employees
      establishment_type: 2, // Branch
      year_filing_for: 2024,
      annual_average_employees: 125,
      total_hours_worked: 260000,
      no_injuries_illnesses: 0,
      total_deaths: 0,
      total_dafw_cases: 1,
      total_djtr_cases: 1,
      total_other_cases: 1,
      total_dafw_days: 5,
      total_djtr_days: 10,
      total_injuries: 2,
      total_skin_disorders: 0,
      total_respiratory_conditions: 0,
      total_poisonings: 1,
      total_hearing_loss: 0,
      total_other_illnesses: 0,
    },
  });

  console.log(`✅ Created annual summary for ${summary.year_filing_for}`);

  console.log('🎉 Seed completed successfully!');
  console.log(`
  Summary:
  - ${3} incidents created
  - 1 annual summary created
  - Establishment: Manufacturing Plant 1
  - Year: 2024
  `);
}

/**
 * Execute seed function with error handling
 */
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('❌ Error during seed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });

