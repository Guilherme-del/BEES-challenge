export interface ICompany {
	id: string;
	name: string;
	brewery_type: string;
	street: string;
	address_2: string | null;
	address_3: string | null;
	city: string;
	state: string;           
	postal_code: string;
	country: string;
	longitude: string;
	latitude: string;
	phone: string;
	website_url: string | null;
	county_province: string | null;
	created_at: Date | string;
	updated_at: Date | string;
	tag?: string;
}

export interface ICompaniesResponse {
	data: {
		id: string;
		name: string;
		brewery_type: string;
		street: string;
		address_2: string | null;
		address_3: string | null;
		city: string;
		state: string;
		postal_code: string;
		country: string;
		longitude: string;
		latitude: string;
		phone: string;
		website_url: string | null;
		county_province: string | null;
		created_at: Date | string;
		updated_at: Date | string;
	};
}

