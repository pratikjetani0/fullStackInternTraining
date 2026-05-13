// You're building an internal hospital app. A Patient has personal info, a linked Doctor, a list of Diagnosis records, and emergency contact details. Some fields are always present. Some are optional. Some must never change after creation.

interface Doctor {
  readonly id: string;
  name: string;
  specialisation: string;
}

interface Diagnosis {
  code: string;
  description: string;
  dateRecorded: string; // Date
  severity?: "low" | "medium" | "high";
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

type BloodType = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

interface Patient {
  readonly id: string;
  fullName: string;
  dateOfBirth: string; // Date
  bloodType: BloodType;
  doctor: Doctor;
  diagnoses: Diagnosis[];
  emergencyContact?: EmergencyContact;
}

const patient: Patient = {
  id: "PAT-101",
  fullName: "Ram shah",
  dateOfBirth: "1990-07-22",
  bloodType: "B+",
  doctor: {
    id: "DOC-42",
    name: "Dr. Mehta",
    specialisation: "Cardiology",
  },
  diagnoses: [
    {
      code: "I10",
      description: "Essential hypertension",
      dateRecorded: "2024-03-10",
      severity: "medium",
    },
  ],
  emergencyContact : {
    name : "Raj",
    phone : "9878474873",
    relationship : "Brother"
  }
};

console.log(patient);
