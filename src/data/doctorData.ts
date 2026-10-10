import { DoctorProfile } from '../types';

export const doctorData: DoctorProfile = {
  name: 'Eleanor Vance',
  honorific: 'Dr.',
  specialization: 'Internal Medicine & Preventive Health',
  title: 'Senior Attending Physician & Clinical Director',
  experienceYears: 12,
  consultationsCount: '5,000+',
  rating: 4.9,
  reviewsCount: 384,
  qualifications: [
    'MBBS / MD (Doctor of Medicine)',
    'Board Certified in Internal Medicine (ABIM)',
    'Fellow of the American College of Physicians (FACP)',
    'Certified in Comprehensive Preventive & Chronic Care Management',
  ],
  boardCertifications: [
    'American Board of Internal Medicine (ABIM)',
    'State Medical Board Active License #MD-884219',
    'Advanced Cardiac Life Support (ACLS)',
  ],
  languages: ['English', 'Spanish'],
  bio: 'Dr. Eleanor Vance, MD, is a board-certified internal medicine physician dedicated to comprehensive, patient-centered adult healthcare. With over 12 years of hospital and clinical outpatient practice, she focuses on evidence-based preventive wellness, early diagnostic assessment, and personalized management for complex and chronic medical conditions. Dr. Vance believes medicine is at its best when patients are treated with unhurried dignity, clear communication, and empathetic clinical partnership.',
  clinicalPhilosophy:
    'Healthcare is not just the treatment of symptoms, but the dedicated partnership between patient and physician to achieve sustained vitality, clarity, and peace of mind through science-backed clinical vigilance.',
  areasOfExpertise: [
    'Preventive & Executive Health Assessments',
    'Hypertension & Cardiovascular Risk Management',
    'Type 2 Diabetes & Metabolic Optimization',
    'Thyroid & Endocrine Function Disorders',
    'Adult Immunizations & Travel Health',
    'Diagnostic Workups for Complex Symptoms',
  ],
  educationTimeline: [
    {
      year: '2022 – Present',
      role: 'Clinical Director & Lead Physician',
      institution: 'Vance Integrative Internal Medicine Clinic',
      description: 'Directing comprehensive adult primary care practice with focus on longitudinal disease prevention and diagnostic precision.',
    },
    {
      year: '2017 – 2022',
      role: 'Senior Consultant & Attending Physician',
      institution: 'St. Vincent Academic Health Center',
      description: 'Supervised resident physicians in acute clinical wards and outpatient internal medicine consultations.',
    },
    {
      year: '2014 – 2017',
      role: 'Internal Medicine Clinical Residency',
      institution: 'Metropolitan Medical Center & University Hospitals',
      description: 'Completed rigorous 3-year accredited residency with distinction in ambulatory internal medicine and cardiopulmonary diagnostics.',
    },
    {
      year: '2010 – 2014',
      role: 'Doctor of Medicine (M.D.)',
      institution: 'Johns Hopkins University School of Medicine',
      description: 'Graduated in top tier of medical cohort; research contributions in early vascular risk screening markers.',
    },
    {
      year: '2006 – 2010',
      role: 'B.S. in Biomolecular Sciences (Honors)',
      institution: 'Columbia University',
      description: 'Summa Cum Laude, foundational research in cellular metabolism and physiology.',
    },
  ],
  hospitalAffiliations: [
    'St. Vincent University Hospital (Admitting Privileges)',
    'Metropolitan Medical Pavilion (Consulting Staff)',
  ],
  imagePath: '/src/assets/images/doctor_portrait_1791637176045.jpg',
  consultationImage: '/src/assets/images/consultation_care_1791637205125.jpg',
  clinicImage: '/src/assets/images/clinic_interior_1791637190307.jpg',
};
