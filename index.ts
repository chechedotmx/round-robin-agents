import { SheetsManager } from "./Managers/SheetsManager"
import { RoundRobinManager } from "./Managers/RoundRobinManager";

function doGet(e) {
    let sm = new SheetsManager("1iJk98RFO0nU9iFMTlC2BJIe3V2DqKPqeQ-DAn4dHkOw");
    let zipEnquiry = e.parameter["zip"];
    //Comment

    let rrm = new RoundRobinManager(sm, zipEnquiry);
    const selectedAgent = rrm.getRoundRobinAgent();
    rrm.addEnquiryLog(selectedAgent);
    return ContentService.createTextOutput(JSON.stringify(selectedAgent)).setMimeType(ContentService.MimeType.JSON);
}
