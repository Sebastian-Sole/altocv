export interface CoverLetterContactInfo {
	fullName: string;
	email: string;
	phone?: string;
	location?: string;
}

export interface RecipientInfo {
	companyName?: string;
	hiringManagerName?: string;
	companyAddress?: string;
}

export interface CoverLetter {
	_id: string;
	userId: string;
	title: string;
	language: string;
	templateId: string;
	linkedCvId?: string;
	contactInfo: CoverLetterContactInfo;
	recipientInfo: RecipientInfo;
	date: string;
	subject: string;
	body: string;
	signOff?: string;
	isPublic?: boolean;
	createdAt: number;
	updatedAt: number;
}

export function createEmptyCoverLetterContactInfo(): CoverLetterContactInfo {
	return {
		fullName: "",
		email: "",
	};
}

export function createEmptyRecipientInfo(): RecipientInfo {
	return {};
}
