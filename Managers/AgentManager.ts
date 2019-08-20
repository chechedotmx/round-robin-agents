import { Agent } from "../BusinessObjects/Agent"
import { strict } from "assert";
import { stringify } from "querystring";
import { EnquiryLog } from "../BusinessObjects/EnquiryLog";
export class AgentManager {

    public static getAgentsFromData(data: any[][]): Array<Agent> {
        let agentArray: Array<Agent> = new Array<Agent>();
        for (const row of data) {
            let [agencyName, name, phone, email, zips] = row;
            if (agencyName != "" && name != "" && phone != "" && email != "" && zips != "") {
                let agent = new Agent(agencyName, name, phone, email, zips);
                agentArray.push(agent);
            }
        }
        return agentArray;
    }

    public static getEnquiryLogsFromData(data: any[][]): Array<EnquiryLog> {
        let enquiryArray: Array<EnquiryLog> = new Array<EnquiryLog>();
        for (const row of data) {
            let [agencyName, name, phone, email, zipCode, cycleNumber, date] = row;
            if (
                agencyName != ""
                && name != ""
                && phone != ""
                && email != ""
                && zipCode != ""
                && cycleNumber != ""
                && date != ""
            ) {
                let enquiryLog = new EnquiryLog(agencyName, name, phone, email, zipCode, cycleNumber, date);
                enquiryArray.push(enquiryLog);
            }
        }
        return enquiryArray;
    }


    public static getMaxCycleEnquiryLogsByZipCode = (enquiries: Array<EnquiryLog>, zipCode: string): { cycleNumber: number, enquiries: Array<EnquiryLog> } => {
        let enquiryArray: Array<EnquiryLog> = new Array<EnquiryLog>();
        let maxCycleNumber = 1;
        for (const enquiry of enquiries) {
            if (enquiry.zipCode === zipCode) {
                enquiryArray.push(enquiry);
                if (enquiry.cycleNumber > maxCycleNumber)
                    maxCycleNumber = enquiry.cycleNumber;
            }
        }
        if (maxCycleNumber !== 1) {
            enquiryArray = AgentManager.filterCycleEnquiries(enquiryArray, maxCycleNumber);
        }
        return { cycleNumber: maxCycleNumber, enquiries: enquiryArray };
    }

    private static filterCycleEnquiries(enquiries: Array<EnquiryLog>, cycleNumber: number): Array<EnquiryLog> {
        let enquiryArray: Array<EnquiryLog> = new Array<EnquiryLog>();
        for (const enquiry of enquiries) {
            if (enquiry.cycleNumber === cycleNumber)
                enquiryArray.push(enquiry);
        }
        return enquiryArray;
    }

    public static getAgentsByZipCode(agents: Array<Agent>, zipCode: string): Array<Agent> {
        let agentArray: Array<Agent> = new Array<Agent>();
        for (const agent of agents) {
            if (agent.zipCodes.indexOf(zipCode) > -1)
                agentArray.push(agent);
        }
        return agentArray;
    }

    public static filterAgents(zipAgents: Array<Agent>, enquiries: Array<EnquiryLog>): Array<Agent> {
        let agentArray: Array<Agent> = new Array<Agent>();
        for (const zipCodeAgent of zipAgents) {
            let found = false;
            for (const enquiryZipAgent of enquiries) {
                if (
                    zipCodeAgent.name === enquiryZipAgent.name &&
                    zipCodeAgent.agencyName === enquiryZipAgent.agencyName &&
                    zipCodeAgent.email === enquiryZipAgent.email &&
                    zipCodeAgent.phone === enquiryZipAgent.phone
                ) {
                    found = true;
                    break;
                }
            }
            if (!found)
                agentArray.push(zipCodeAgent);
        }
        return agentArray;
    }

}