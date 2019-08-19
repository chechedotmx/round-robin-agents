import { SheetsManager } from "./SheetsManager";
import { AgentManager } from "./AgentManager";
import { Agent } from "../BusinessObjects/Agent";
import { EnquiryLog } from "../BusinessObjects/EnquiryLog";

export class RoundRobinManager {

    private _sheetsManager: SheetsManager;
    private _agentsSheetName: string = "Agents";
    private _rangeAgents: string = "A2:E";
    private _enquiryLogSheetName: string = "EnquiryLog";
    private _rangeEnquiryLog: string = "A:G";
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

    private getEnquiryZipLog = (): { cycleNumber: number, enquiries: Array<EnquiryLog> } => {
        this._sheetsManager.ActiveSheet = this._enquiryLogSheetName;
        const data = this._sheetsManager.getRangeValues(this._rangeEnquiryLog);
        const enquiryLogs = AgentManager.getEnquiryLogsFromData(data);
        return AgentManager.getMaxCycleEnquiryLogsByZipCode(enquiryLogs, this._zipEnquiry);
    }


    public addEnquiryLog(agent: Agent, cycleNumber: number): void {
        this._sheetsManager.ActiveSheet = this._enquiryLogSheetName;
        let agentArray = agent.toArray();
        agentArray.pop();
        agentArray.push(this._zipEnquiry);
        agentArray.push(cycleNumber);
        agentArray.push(new Date().toLocaleString());
        this._sheetsManager.appendStringRow(agentArray);
    }

    public getRoundRobinAgent = (): { cycleNumber: number, selectedAgent: Agent } => {
        let zipAgents = this.getZipAgents();
        if (zipAgents.length === 0)
            return null;
        let enquiryZipAgents = this.getEnquiryZipLog();
        let cycleNumber = enquiryZipAgents.cycleNumber;

        let filteredAgents = AgentManager.filterAgents(zipAgents, enquiryZipAgents.enquiries);
        if (filteredAgents.length === 0) {
            filteredAgents = zipAgents;
            cycleNumber = cycleNumber + 1;
        }


        if (filteredAgents.length === 0)
            return null;
        var selectedAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];
        return { cycleNumber: cycleNumber, selectedAgent: selectedAgent };
    }
}   