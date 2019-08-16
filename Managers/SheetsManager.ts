export class SheetsManager {
    private _spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private _activeSheet: GoogleAppsScript.Spreadsheet.Sheet;

    constructor(sheetId: string) {
        this._spreadSheet = SpreadsheetApp.openById(sheetId);
    }

    set ActiveSheet(name: string) {
        this._activeSheet = this._spreadSheet.getSheetByName(name);
        if (this._activeSheet === null)
            throw new Error(`No sheet was found with name "${name}"`);
    }

    public getRangeValues(range: string): any[][] {
        if (this._activeSheet === undefined || this._activeSheet === null)
            throw new Error('There is no active sheet');
        return this._activeSheet.getRange(range).getValues();
    }

    public appendStringRow(rowContents: any[]): void {
        if (this._activeSheet === undefined || this._activeSheet === null)
            throw new Error('There is no active sheet');
        const rng = this._activeSheet.getRange(this._activeSheet.getLastRow() + 1, 1, 1, rowContents.length);
        const arrayFormats: Array<any> = new Array<any>();
        for (let index = 0; index < rowContents.length; index++) {
            arrayFormats.push('@');
        }
        rng.setNumberFormats([arrayFormats]);
        rng.setValues([rowContents]);
    }

}