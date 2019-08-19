import { SheetsManager } from "./Managers/SheetsManager"
import { RoundRobinManager } from "./Managers/RoundRobinManager";
import { RoundRobinResponse, ResponseStatus, ResponseMessage } from "./BusinessObjects/RoundRobinResponse";

function doGet(e) {
    let sm = new SheetsManager("1iJk98RFO0nU9iFMTlC2BJIe3V2DqKPqeQ-DAn4dHkOw");
    let zipEnquiry = e.parameter["zip"];
    //let zipEnquiry = "0800";
    //Comment

    let rrm = new RoundRobinManager(sm, zipEnquiry);
    const roundRobin = rrm.getRoundRobinAgent();
    let response;
    if (roundRobin === null)
        response = new RoundRobinResponse(ResponseStatus.ERROR, ResponseMessage.ZIPMISSING, null, null)
    else {
        rrm.addEnquiryLog(roundRobin.selectedAgent, roundRobin.cycleNumber);
        response = new RoundRobinResponse(ResponseStatus.OK, ResponseMessage.PROCESSED, roundRobin.selectedAgent, roundRobin.cycleNumber);
    }
    return ContentService.createTextOutput(
        JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
}
