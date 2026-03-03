export interface ContactInfo {
	fullName: string;
	email: string;
	phone?: string;
	location?: string;
	linkedin?: string;
	website?: string;
	summary?: string;
}

export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	location?: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description: string;
}

export interface Education {
	id: string;
	institution: string;
	degree: string;
	field: string;
	location?: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description?: string;
}

export interface Skill {
	id: string;
	name: string;
	level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Language {
	id: string;
	name: string;
	proficiency: "native" | "fluent" | "advanced" | "intermediate" | "beginner";
}

export interface Certificate {
	id: string;
	name: string;
	issuer: string;
	date?: string;
	url?: string;
}

export interface Award {
	id: string;
	title: string;
	issuer: string;
	date?: string;
	description?: string;
}

export interface VolunteerWork {
	id: string;
	organization: string;
	role: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description?: string;
}

export interface Presentation {
	id: string;
	title: string;
	event: string;
	date?: string;
	url?: string;
	description?: string;
}

export interface CVSections {
	workExperience: WorkExperience[];
	education: Education[];
	skills: Skill[];
	languages: Language[];
	certificates: Certificate[];
	awards: Award[];
	volunteerWork: VolunteerWork[];
	presentations: Presentation[];
	interests: string[];
}

export interface CV {
	_id: string;
	userId: string;
	title: string;
	language: string;
	templateId: string;
	sectionOrder: string[];
	contactInfo: ContactInfo;
	sections: CVSections;
	createdAt: number;
	updatedAt: number;
}

export const DEFAULT_SECTION_ORDER = [
	"workExperience",
	"education",
	"skills",
	"languages",
	"certificates",
	"awards",
	"volunteerWork",
	"presentations",
	"interests",
] as const;

export const SECTION_LABELS: Record<string, string> = {
	workExperience: "Work Experience",
	education: "Education",
	skills: "Skills",
	languages: "Languages",
	certificates: "Certificates",
	awards: "Awards",
	volunteerWork: "Volunteer Work",
	presentations: "Presentations",
	interests: "Interests",
};

export function createEmptySections(): CVSections {
	return {
		workExperience: [],
		education: [],
		skills: [],
		languages: [],
		certificates: [],
		awards: [],
		volunteerWork: [],
		presentations: [],
		interests: [],
	};
}

export function createEmptyContactInfo(): ContactInfo {
	return {
		fullName: "",
		email: "",
	};
}
