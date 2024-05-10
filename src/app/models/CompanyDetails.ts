export class CompanyDetails {

    constructor(
        public ticker: string, 
        public name: string,
        public description: string,
        public startDate: string,
        public exchangeCode: string) {

    }
}

export interface DetailsResponse {
    results: CompanyDetails[];
    success: boolean;
}