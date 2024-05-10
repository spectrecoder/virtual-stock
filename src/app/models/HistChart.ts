export class HistChart {

    constructor(
        public date: number, 
        public open: string,
        public high: string,
        public low: string,
        public close: string,
        public volume: string) {

            this.date = new Date(date).getTime();
        }
}

export interface HistChartResponse {
    total: Number;
    results: HistChart[];
    success: boolean;
}