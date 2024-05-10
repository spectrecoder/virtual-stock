import { NumberInput } from '@angular/cdk/coercion';

export class CompanySearchResult {

    constructor(public ticker: string, public name: string) {}
}

export interface InSearchResponse {
    total: Number;
    results: CompanySearchResult[];
}