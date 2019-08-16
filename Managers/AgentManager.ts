import { Agent } from "../BusinessObjects/Agent"
import { strict } from "assert";
import { stringify } from "querystring";
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

    public static getAgentsByZipCode(agents: Array<Agent>, zipCode: string): Array<Agent> {
        let agentArray: Array<Agent> = new Array<Agent>();
        for (const agent of agents) {
            if (agent.zipCodes.indexOf(zipCode) > -1)
                agentArray.push(agent);
        }
        return agentArray;
    }

    public static filterAgents(zipAgents: Array<Agent>, enquiryZipAgents: Array<Agent>): Array<Agent> {
        let agentArray: Array<Agent> = new Array<Agent>();
        for (const zipCodeAgent of zipAgents) {
            let found = false;
            for (const enquiryZipAgent of enquiryZipAgents) {
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