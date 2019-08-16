import { SheetsManager } from "./SheetsManager";
import { AgentManager } from "./AgentManager";
import { Agent } from "../BusinessObjects/Agent";

export class RoundRobinManager {

    private _sheetsManager: SheetsManager;
    private _agentsSheetName: string = "Agents";
    private _rangeAgents: string = "A2:E";
    private _enquiryLogSheetName: string = "EnquiryLog";
    private _rangeEnquiryLog: string = "A:E";
    private _zipEnquiry: string;

    constructor(sheetsManager: SheetsManager, zipEnquiry: string) {
        this._sheetsManager = sheetsManager;
        this._zipEnquiry = zipEnquiry;
    }

    private getZipAgents(): Array<Agent> {
        this._sheetsManager.ActiveSheet = this._agentsSheetName;
        const values = this._sheetsManager.getRangeValues(this._rangeAgents);
        const allAgents = AgentManager.getAgentsFromData(values);
        const zipAgents = AgentManager.getAgentsByZipCode(allAgents, this._zipEnquiry);
        return zipAgents;
    }

    private getEnquiryZipAgents(): Array<Agent> {
        this._sheetsManager.ActiveSheet = this._enquiryLogSheetName;
        const enquiryLogs = this._sheetsManager.getRangeValues(this._rangeEnquiryLog);
        const enquiryAgents = AgentManager.getAgentsFromData(enquiryLogs);
        const enquiryZipAgents = AgentManager.getAgentsByZipCode(enquiryAgents, this._zipEnquiry);
        return enquiryZipAgents;
    }


    public addEnquiryLog(agent: Agent): void {
        this._sheetsManager.ActiveSheet = this._enquiryLogSheetName;
        let agentArray = agent.toArray();
        agentArray.pop();
        agentArray.push(this._zipEnquiry);
        agentArray.push(new Date().toLocaleString());
        this._sheetsManager.appendStringRow(agentArray);
    }

    public getRoundRobinAgent(): Agent {
        let zipAgents = this.getZipAgents();
        let enquiryZipAgents = this.getEnquiryZipAgents();
        const filteredAgents = AgentManager.filterAgents(zipAgents, enquiryZipAgents);
        if (filteredAgents.length === 0)
            return null;
        var selectedAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];
        return selectedAgent;
    }
}   