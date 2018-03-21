// Chart -angular-report
export class ChartDateData {
    organization: string;
    size: number;

    constructor(name: string, size: number) {
        this.organization = name;
        this.size = size;
    }
}
