import { Agent } from "./Agent";

export class RoundRobinResponse {
    status: ResponseStatus;
    message: ResponseMessage;
    agent: Agent;
    cycleNumber: number;
    constructor(status: ResponseStatus, message: ResponseMessage, agent: Agent, cycleNumber: number) {
        this.status = status;
        this.message = message;
        this.agent = agent;
        this.cycleNumber = cycleNumber;
    }
}

export enum ResponseStatus {
    OK = "OK",
    ERROR = "ERROR"
}

export enum ResponseMessage {
    PROCESSED = "Script correctly processed",
    ZIPMISSING = "No Zip Code Found"
}
