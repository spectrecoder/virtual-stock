export class News {

    public encodedUrl: string;
    public encodedTitle: string;

    constructor(
        public url: string, 
        public title: string,
        public description: string,
        public source: string,
        public urlToImage: string,
        public publishedAt: string) {

            this.publishedAt = this.formateDate(publishedAt);
            this.encodedUrl = encodeURIComponent(url);
            this.encodedTitle = encodeURIComponent(title);

    }

    public formateDate(publishedAt: string): string{

        const date = new Date(publishedAt);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long'} ).format(date);
        const year = date.getFullYear();
        const day = date.getDay();
        return (month + ' ' + day + ', ' + year);
    }

}



export interface NewsResponse {
    results: News[];
    success: boolean;
}