export class Agent {
    agencyName: string;
    name: string;
    phone: string;
    email: string;
    zipCodes: Array<string>;

    constructor(
        agencyName: string,
        name: string,
        phone: string,
        email: string,
        zipCodes: string) {
        this.agencyName = agencyName;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.zipCodes = zipCodes.split(",");
    }

    public toArray(): any[] {
        return [this.agencyName, this.name, this.phone, this.email, this.zipCodes.join(",")];
    }
}