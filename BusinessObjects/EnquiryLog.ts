export class EnquiryLog {
    agencyName: string;
    name: string;
    phone: string;
    email: string;
    zipCode: string;
    cycleNumber: number;
    date: Date;

    constructor(
        agencyName: string,
        name: string,
        phone: string,
        email: string,
        zipCode: string,
        cycleNumber: number,
        date: Date
    ) {
        this.agencyName = agencyName;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.zipCode = zipCode;
        this.cycleNumber = cycleNumber;
        this.date = date;
    }

}