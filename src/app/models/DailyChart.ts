export class DailyChart {

    constructor(public date: string, public close: string) {}
}

export interface DailyChartResponse {
    total: Number;
    results: DailyChart[];
}