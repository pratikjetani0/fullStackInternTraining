# HRMS (Human Resource Management System)

## Project Overview

This HRMS is designed to manage the complete employee lifecycle from recruitment to employee management. The system includes role-based access control, employee management, job portal workflow, leave management, asset management, document management, and company-wide announcements.

### Employee Lifecycle

```text
Job Posting
    ↓
Candidate Application
    ↓
Interview Process
    ↓
Offer Management
    ↓
Employee Onboarding
    ↓
Employee Management
    ↓
Leave Management
    ↓
Asset Management
    ↓
Document Management
```

---

# System Modules

## 1. Authentication & Authorization

Provides secure access to the HRMS using Role-Based Access Control (RBAC).

### Features

- User Login
- User Activation / Deactivation
- Role Management
- Permission Management
- Multiple Roles per User
- User-specific Permission Override

### Tables

```text
roles
permissions
role_permissions
users
user_roles
user_permissions
```

### Permission Flow

```text
Role
    ↓
Role Permissions
    ↓
User
    ↓
Optional User Permission Override
```

---

# 2. Organization Management

Manages organizational structure.

### Features

- Department Management
- Designation Management
- Designation Levels

### Tables

```text
departments
designations
```

Example:

```text
Engineering
    ├── Frontend
    ├── Backend

HR
Finance
```

---

# 3. Employee Management

Stores employee master information.

### Features

- Employee Profile
- Work Information
- Personal Information
- Identification Information
- Bank Information
- Skills
- Previous Experience

### Tables

```text
employees

employee_personal_details

employee_work_details

employee_identification_details

employee_bank_details

employee_experience

skills

employee_skills
```

### Employee Structure

```text
Employee
│
├── Personal Details
├── Work Details
├── Identification Details
├── Bank Details
├── Experience
└── Skills
```

---

# 4. Job Portal Workflow

Handles hiring workflow from job posting to employee creation.

### Features

- Job Posting
- Candidate Applications
- Interview Scheduling
- Interview Feedback
- Offer Management
- Employee Conversion

### Tables

```text
jobs

job_applications

interviews

offers
```

### Recruitment Flow

```text
Job
    ↓
Application
    ↓
Shortlisted
    ↓
Interview
    ↓
Selected
    ↓
Offer
    ↓
Hired
    ↓
Employee Created
```

### Application Statuses

```text
APPLIED
SHORTLISTED
INTERVIEW_SCHEDULED
INTERVIEW_IN_PROGRESS
SELECTED
OFFERED
HIRED
REJECTED
WITHDRAWN
```

---

# 5. Leave Management

Manages employee leave requests and leave policies.

### Features

- Leave Types
- Leave Allocation Rules
- Eligibility Rules
- Carry Forward Rules
- Leave Applications
- Approval Workflow
- Holiday Management

### Tables

```text
leave_types

leave_type_rules

leave_type_eligibility_rules

leave_balances

leave_applications

leave_application_approvals

holidays
```

### Supported Leave Types

```text
CL  - Casual Leave
SL  - Sick Leave
ML  - Maternity Leave
PL  - Paternity Leave
MAR - Marriage Leave
BRV - Bereavement Leave
```

### Leave Eligibility Examples

```text
ML
→ Female Employees

PL
→ Male Employees

Marriage Leave
→ Minimum 18 Months Experience
→ Single Employee
```

### Carry Forward Policy

Example:

```text
0-24 Months
    Allocated: 12
    CF Limit: 3

25-60 Months
    Allocated: 15
    CF Limit: 5

60+ Months
    Allocated: 18
    CF Limit: 7
```

---

# 6. Asset Management

Tracks company assets assigned to employees.

### Features

- Asset Tracking
- Asset Assignment
- Asset Return
- Lost/Damaged Tracking
- Asset History

### Tables

```text
assets

asset_history
```

### Supported Asset Types

```text
PC
LAPTOP
MOUSE
KEYBOARD
LAPTOP_ADAPTOR
```

### Asset Lifecycle

```text
Available
    ↓
Assigned
    ↓
Returned
```

---

# 7. Document Management

Stores organization and employee documents.

### Features

- Employee Documents
- Organization Documents
- Document Verification
- Signed Documents
- Offer Letter Storage
- Policy Acknowledgement

### Tables

```text
organization_documents

employee_documents

signed_documents
```

### Employee Document Types

```text
Resume

PAN Card

Aadhaar Card

Passport

Offer Letter

Experience Letter

Other Documents
```

---

# 8. Announcement Management

Provides company-wide communication.

### Features

- Publish Announcements
- Department-specific Announcements
- Role-specific Announcements
- Expiry Management

### Tables

```text
announcements

announcement_targets
```

### Announcement Targets

```text
ALL

DEPARTMENT

ROLE
```

### Priorities

```text
LOW

NORMAL

HIGH

URGENT
```

---

# Database Design Principles

### Soft Delete

Used in major tables:

```text
deleted_at
```

Benefits:

- Data Recovery
- Audit History
- Compliance

---

### UUID Primary Keys

All entities use:

```sql
UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

Benefits:

- Globally Unique
- Secure Public IDs
- Better Distributed Systems Support

---

### Audit Fields

Most tables include:

```text
created_at

updated_at
```

for tracking record changes.
