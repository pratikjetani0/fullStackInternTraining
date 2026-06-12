--ROLES 
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--PERMISSIONS 
CREATE TABLE permissions (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    module_name VARCHAR(100) NOT NULL,
    resource_name VARCHAR(100) NOT NULL,
    action_name VARCHAR(100) NOT NULL,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_permission
    UNIQUE (
        module_name,
        resource_name,
        action_name
    )
	
);

--ROLE WISE PERMISSIONS 
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_role_permission
        UNIQUE(role_id, permission_id)
);

--USERS 
CREATE TABLE users(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT,
    
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    
    last_login_at TIMESTAMP,
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);


--USER ROLES (MUTIPLE ROLES ASSIGN TO ONE USER)
CREATE TABLE user_roles (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	
	user_id UUID NOT NULL,
	role_id UUID NOT NULL,
	
	assigned_at TIMESTAMP NOT NULL DEFAULT NOw(),
	
	assigned_by UUID,
	
	CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id),
       
    CONSTRAINT fk_assigned_by
	FOREIGN KEY (assigned_by)
	REFERENCES users(id),

    CONSTRAINT unique_user_role
        UNIQUE(user_id, role_id)
);


-- USER PRMISSION(BY ROLE DEFAULT PERMISSION WE CAN ALSO OVERRIDE THAT PERMISSION)(OPTIONAL)
CREATE TABLE user_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    user_id UUID NOT NULL,
    
    permission_id UUID NOT NULL,
    
    is_allowed BOOLEAN NOT NULL,
    
    assigned_by UUID,
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id),

    CONSTRAINT unique_user_permission
        UNIQUE(user_id, permission_id)
    
);

-- DEPARTMENTS
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    department_code VARCHAR(20) UNIQUE NOT NULL,
    
    name VARCHAR(100) NOT NULL UNIQUE,
    
    description TEXT,
    
    parent_department_id UUID,
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,

    CONSTRAINT fk_parent_department
        FOREIGN KEY (parent_department_id)
        REFERENCES departments(id)

	    
);

DROP TABLE departments CASCADE;
DROP TABLE designations CASCADE;


-- DESIGNATIONS
CREATE TABLE designations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    designation_code VARCHAR(20) UNIQUE,
    
    name VARCHAR(100) NOT NULL UNIQUE,

    level INTEGER NOT NULL 
    	CHECK(level > 0),
    
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);


-- SKILLS
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

--===========================
--EMPLOYEE MANAGEMENT
--===========================

-- EMPLOYESS(CORE)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE,

    employee_code VARCHAR(50) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,

    CONSTRAINT fk_employee_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- EMP PERSONAL DETAILS
CREATE TABLE employee_personal_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL UNIQUE,

    date_of_birth DATE,

    gender VARCHAR(20)
        CHECK (
            gender IN (
                'MALE',
                'FEMALE'
            )
        ),

    marital_status VARCHAR(20)
        CHECK (
            marital_status IN (
                'SINGLE',
                'MARRIED',
                'DIVORCED'
            )
        ),

    nationality VARCHAR(100),

    blood_group VARCHAR(10),

    profile_photo_url TEXT,

    work_email VARCHAR(255),
    personal_email VARCHAR(255),

    personal_phone VARCHAR(20),

    current_address JSONB,
    permanent_address JSONB,

    languages TEXT[],

    emergency_contacts JSONB,

    family_details JSONB,
	
    dependent_details JSONB,

    education_details JSONB,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_employee_personal
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);


-- EMP WORKS DETAILS
CREATE TABLE employee_work_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL UNIQUE,

    department_id UUID NOT NULL,

    designation_id UUID NOT NULL,

    manager_id UUID,

    employment_status VARCHAR(30)
        NOT NULL
        DEFAULT 'PROBATION'
        CHECK (
            employment_status IN (
                'PROBATION',
                'ACTIVE',
                'NOTICE_PERIOD',
                'RESIGNED',
                'TERMINATED',
                'RETIRED'
            )
        ),

    employment_type VARCHAR(30)
        NOT NULL
        DEFAULT 'FULL_TIME'
        CHECK (
            employment_type IN (
                'FULL_TIME',
                'PART_TIME',
                'CONTRACT',
                'INTERN'
            )
        ),

    work_mode VARCHAR(20)
        NOT NULL
        DEFAULT 'OFFICE'
        CHECK (
            work_mode IN (
                'OFFICE',
                'REMOTE',
                'HYBRID'
            )
        ),

    joining_date DATE NOT NULL,

    probation_end_date DATE,

    exit_date DATE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (department_id)
        REFERENCES departments(id),

    FOREIGN KEY (designation_id)
        REFERENCES designations(id),

    FOREIGN KEY (manager_id)
        REFERENCES employees(id)
);


-- EMP INENTIFICATION DETAILS
CREATE TABLE employee_identification_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL UNIQUE,

    pan_number VARCHAR(20) UNIQUE,

    aadhaar_number VARCHAR(20) UNIQUE,

    passport_number VARCHAR(50),
    
    uan_number VARCHAR(50),

    driving_license_number VARCHAR(50),

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);


-- EMP BANK DETAILS
CREATE TABLE employee_bank_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL UNIQUE,

    account_holder_name VARCHAR(150),

    bank_name VARCHAR(150),

    account_number VARCHAR(50),

    ifsc_code VARCHAR(20),

    branch_name VARCHAR(150),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);


-- EMP EXPERIENCE
CREATE TABLE employee_experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL,

    company_name VARCHAR(255),

    designation VARCHAR(255),

    location VARCHAR(255),

    start_date DATE,

    end_date DATE,

    description TEXT,

    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);


-- EMP WISE SKILLS
CREATE TABLE employee_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL,

    skill_id UUID NOT NULL,

    proficiency_level VARCHAR(20)
        CHECK (
            proficiency_level IN (
                'BEGINNER',
                'INTERMEDIATE',
                'ADVANCED',
                'EXPERT'
            )
        ),

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(employee_id, skill_id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (skill_id)
        REFERENCES skills(id)
);


--========================================
--LEAVE MANAGEMENT
--========================================

--LEAVE TYPE 
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    code VARCHAR(20) NOT NULL UNIQUE,
    
    name VARCHAR(100) NOT NULL UNIQUE,
    
    description TEXT,
    
    is_paid BOOLEAN NOT NULL DEFAULT TRUE,
    
    allow_half_day BOOLEAN NOT NULL DEFAULT FALSE,
    
    --TRUE ONLY OF CL TYPE
    is_carry_forward_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
    
);


-- LEAVE TYPE RULES BASED ON EXPERIENCE
CREATE TABLE leave_type_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    leave_type_id UUID NOT NULL,

    min_experience_months INTEGER,

    max_experience_months INTEGER,

    allocated_days DECIMAL(5,2) NOT NULL,
    
    carry_forward_limit DECIMAL(5,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(id),

    UNIQUE (
        leave_type_id,
        min_experience_months,
        max_experience_months
    	)
);

DROP TABLE LEAVE_TYPE_RULES ;


-- LEAVE ELIGIBILITY RULES(GENDER, MARRIED_STATUS, SPECIAL CASE(MAR))
CREATE TABLE leave_type_eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    leave_type_id UUID NOT NULL,

    gender VARCHAR(20)
        CHECK (
            gender IN (
                'MALE',
                'FEMALE'
            )
        ),

    marital_status VARCHAR(20)
        CHECK (
            marital_status IN (
                'SINGLE',
                'MARRIED',
                'DIVORCED'
            )
        ),

    min_experience_months INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(id)
);


-- LEAVE BALANCES BEFORE USED AND AFTER USED
CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL,

    leave_type_id UUID NOT NULL,

    year INTEGER NOT NULL,

    allocated_days DECIMAL(5,2) NOT NULL DEFAULT 0,

    carried_forward_days DECIMAL(5,2) NOT NULL DEFAULT 0,

    used_days DECIMAL(5,2) NOT NULL DEFAULT 0,

    remaining_days DECIMAL(5,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(id),

    UNIQUE(employee_id, leave_type_id, year)
);


-- LEAVE APPLICATION
CREATE TABLE leave_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    employee_id UUID NOT NULL,

    leave_type_id UUID NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    total_days DECIMAL(5,2) NOT NULL,
    
    reason TEXT NOT NULL,
    
    status VARCHAR(30)
    	NOT NULL
    	DEFAULT 'PENDING'
    	CHECK(
    		status IN (
    			'PENDING',
    			'APPROVED',
    			'REJECTED',
    			'CANCELLED'
    		)
    	),
    
    applied_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(id)
    
);

ALTER TABLE leave_applications
ADD COLUMN is_half_day BOOLEAN NOT NULL DEFAULT FALSE;

-- LEAVE APPLICATION APPROVAL WORKFLOW
CREATE TABLE leave_application_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    leave_application_id UUID NOT NULL,

    approver_employee_id UUID NOT NULL,

    action VARCHAR(30)
        CHECK (
            action IN (
                'APPROVED',
                'REJECTED'
            )
        ),

    action_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (leave_application_id)
        REFERENCES leave_applications(id),

    FOREIGN KEY (approver_employee_id)
        REFERENCES employees(id)
);


--HOLIDAY LEAVES
CREATE TABLE holidays (	
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    holiday_date DATE NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW()

);


--=============================
--ASSETS MANAGEMENT
--=============================

--ASSETS 
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_code VARCHAR(50) NOT NULL UNIQUE,

    asset_type VARCHAR(50)
        NOT NULL
        CHECK (
            asset_type IN (
                'PC',
                'LAPTOP',
                'MOUSE',
                'KEYBOARD',
                'LAPTOP_ADAPTOR'
            )
        ),

    brand VARCHAR(100),

    model VARCHAR(100),

    serial_number VARCHAR(100) UNIQUE,

    asset_status VARCHAR(30)
        NOT NULL
        DEFAULT 'AVAILABLE'
        CHECK (
            asset_status IN (
                'AVAILABLE',
                'ASSIGNED',
                'LOST',
                'DAMAGED',
                'RETIRED'
            )
        ),

    current_employee_id UUID,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (current_employee_id)
        REFERENCES employees(id)
);


-- ASSETS HISTORY
CREATE TABLE asset_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_id UUID NOT NULL,

    employee_id UUID NOT NULL,
    
    assigned_by_employee_id UUID,

    returned_to_employee_id UUID,

    assigned_date DATE NOT NULL,

    returned_date DATE,
    
    action VARCHAR(30)
        NOT NULL
        CHECK (
            action IN (
                'ASSIGNED',
                'RETURNED',
                'LOST',
                'DAMAGED',
                'RETIRED'
            )
        ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (asset_id)
        REFERENCES assets(id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),
        
    FOREIGN KEY (assigned_by_employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (returned_to_employee_id)
        REFERENCES employees(id)
);


-- TICKET FOR ONLY THE ASSET MANAGEMENT
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ticket_number VARCHAR(50) NOT NULL UNIQUE,

    asset_id UUID NOT NULL,

    employee_id UUID NOT NULL,

    assigned_to_employee_id UUID,

    subject VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    priority VARCHAR(20)
        NOT NULL
        DEFAULT 'MEDIUM'
        CHECK (
            priority IN (
                'LOW',
                'MEDIUM',
                'HIGH'
            )
        ),

    status VARCHAR(30)
        NOT NULL
        DEFAULT 'OPEN'
        CHECK (
            status IN (
                'OPEN',
                'IN_PROGRESS',
                'RESOLVED',
                'CLOSED'
            )
        ),

    note TEXT,

    closed_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (asset_id)
        REFERENCES assets(id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (assigned_to_employee_id)
        REFERENCES employees(id)
);


--=============================
--DOCUMENT MANAGEMENT
--=============================

-- ORGANIZATION DOCUMENTS
CREATE TABLE organization_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    document_name VARCHAR(255) NOT NULL,

    document_type VARCHAR(100),

    file_url TEXT NOT NULL,

    version VARCHAR(20),

    uploaded_by_employee_id UUID,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (uploaded_by_employee_id)
        REFERENCES employees(id)
);


-- EMP DOCUMENTS
CREATE TABLE employee_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL,

    document_type VARCHAR(100) 
    	NOT NULL
    	CHECK (
		    document_type IN (
		        'RESUME',
		        'AADHAAR',
		        'PAN',
		        'PASSPORT',
		        'OFFER_LETTER',
		        'EXPERIENCE_LETTER',
		        'OTHER'
		    )
		),

    file_name VARCHAR(255) NOT NULL,

    file_url TEXT NOT NULL,

    uploaded_by_employee_id UUID,

    verification_status VARCHAR(30)
        NOT NULL
        DEFAULT 'PENDING'
        CHECK (
            verification_status IN (
                'PENDING',
                'VERIFIED',
                'REJECTED'
            )
        ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (uploaded_by_employee_id)
        REFERENCES employees(id)
);

ALTER TABLE employee_documents
ADD COLUMN doc_requires_signed BOOLEAN NOT NULL DEFAULT FALSE;


-- SIGNED DOCUMENTS
CREATE TABLE signed_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_document_id UUID NOT NULL,

    employee_id UUID NOT NULL,

    signed_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (employee_document_id)
        REFERENCES employee_documents(id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    UNIQUE(employee_document_id, employee_id)
);

--=============================
--JOB PORTAL
--=============================

-- JOB LISTED OR CREATED(ON CAREER PAGE)
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    job_code VARCHAR(50) NOT NULL UNIQUE,

    title VARCHAR(255) NOT NULL,

    department_id UUID NOT NULL,

    designation_id UUID NOT NULL,

    openings INTEGER NOT NULL DEFAULT 1,

    employment_type VARCHAR(30)
        CHECK (
            employment_type IN (
                'FULL_TIME',
                'PART_TIME',
                'CONTRACT',
                'INTERN'
            )
        ),

    experience_required_years DECIMAL(4,2),

    description TEXT,

    status VARCHAR(30)
        NOT NULL
        DEFAULT 'OPEN'
        CHECK (
            status IN (
                'OPEN',
                'CLOSED',
                'ON_HOLD'
            )
        ),

    created_by_id UUID,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (department_id)
        REFERENCES departments(id),

    FOREIGN KEY (designation_id)
        REFERENCES designations(id),

    FOREIGN KEY (created_by_id)
        REFERENCES employees(id)
);


-- JOB APLICATION
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    job_id UUID NOT NULL,

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    total_experience_years DECIMAL(4,2),

    current_company VARCHAR(255),

    current_ctc DECIMAL(12,2),

    expected_ctc DECIMAL(12,2),

    notice_period_days INTEGER,

    resume_url TEXT NOT NULL,

    status VARCHAR(50)
        NOT NULL
        DEFAULT 'APPLIED'
        CHECK (
            status IN (
                'APPLIED',
                'SHORTLISTED',
                'INTERVIEW_SCHEDULED',
                'INTERVIEW_IN_PROGRESS',
                'SELECTED',
                'OFFERED',
                'HIRED',
                'REJECTED',
                'WITHDRAWN'
            )
        ),

    source VARCHAR(50),

    applied_at TIMESTAMP NOT NULL DEFAULT NOW(),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (job_id)
        REFERENCES jobs(id)
);


ALTER TABLE job_applications
ADD COLUMN notes TEXT;

ALTER TABLE job_applications
ADD COLUMN rejection_reason TEXT;

-- JOB APPLICATION ASSIGNEES TO OTHER EMPLOYEE
CREATE TABLE job_application_assignees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL,

    employee_id UUID NOT NULL,

    assigned_by UUID,

    assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (application_id)
        REFERENCES job_applications(id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),

    FOREIGN KEY (assigned_by)
        REFERENCES employees(id),

    UNIQUE(application_id, employee_id)
);

-- INTERVIEWS WITH STATUS (ROUND 1,2 and 3)
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL,

    round_number INTEGER NOT NULL,

    interview_type VARCHAR(50)
        CHECK (
            interview_type IN (
            	'APTITUDE',
                'TECHNICAL',
                'HR'
            )
        ),

    scheduled_at TIMESTAMP NOT NULL,

    status VARCHAR(30)
        DEFAULT 'SCHEDULED'
        CHECK (
            status IN (
                'SCHEDULED',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (application_id)
        REFERENCES job_applications(id)

);


-- INTERVIEW PANEL MEMBERS
CREATE TABLE interview_panel_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    interview_id UUID NOT NULL,

    employee_id UUID NOT NULL,

    feedback TEXT,

    result VARCHAR(30)
        CHECK (
            result IN (
                'PENDING',
                'PASSED',
                'FAILED'
            )
        ),
        
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (interview_id)
        REFERENCES interviews(id),

    FOREIGN KEY (employee_id)
        REFERENCES employees(id),
    
    UNIQUE(interview_id, employee_id)
        
);

ALTER TABLE INTERVIEW_PANEL_MEMBERS 
ADD COLUMN panel_role VARCHAR(50)
        CHECK (
            panel_role IN (
                'TECHNICAL',
                'HR',
                'MANAGER'
            )
        );

-- OFFERS LETTER AFTER PASSED ALL ROUND
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL UNIQUE,

    offered_ctc DECIMAL(12,2) NOT NULL,

    joining_date DATE,

    offer_letter_url TEXT,

    status VARCHAR(30)
        NOT NULL
        DEFAULT 'PENDING'
        CHECK (
            status IN (
                'PENDING',
                'ACCEPTED',
                'REJECTED',
                'EXPIRED'
            )
        ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (application_id)
        REFERENCES job_applications(id)
);


--=========================
--ANNOUNCEMENTS
--=========================


-- ANNOUNCEMENTS
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(255) NOT NULL,

    content TEXT NOT NULL,

    priority VARCHAR(20)
        NOT NULL
        DEFAULT 'NORMAL'
        CHECK (
            priority IN (
                'LOW',
                'NORMAL',
                'HIGH',
                'URGENT'
            )
        ),

    expiry_date DATE,
    
    read_count INTEGER DEFAULT 0,

    created_by_employee_id UUID NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (created_by_employee_id)
        REFERENCES employees(id)
);

ALTER TABLE ANNOUNCEMENTS ADD COLUMN publish_at DATE ;


-- ANNOUNCEMENTS TARGET(FOR WHICH DEPART, ROLE, ALL FOR...)
CREATE TABLE announcement_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    announcement_id UUID NOT NULL,

    target_type VARCHAR(30)
        NOT NULL
        CHECK (
            target_type IN (
                'ALL',
                'DEPARTMENT',
                'ROLE'
            )
        ),

    department_id UUID,

    role_id UUID,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (announcement_id)
        REFERENCES announcements(id)
        ON DELETE CASCADE,

    FOREIGN KEY (department_id)
        REFERENCES departments(id),

    FOREIGN KEY (role_id)
        REFERENCES roles(id)
);


-- EMAIL TEMPLATES
CREATE TABLE email_templates (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	
	name VARCHAR(100) UNIQUE NOT NULL,
	
	subject VARCHAR(100) NOT NULL,
	
	body_html TEXT NOT NULL,
	
	created_at timestamp
	

);
