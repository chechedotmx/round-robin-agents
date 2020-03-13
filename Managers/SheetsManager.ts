export class SheetsManager {
    private _spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private _activeSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private _data: any[][];

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

        this._data = this._activeSheet.getRange(range).getValues();
        return this._data;
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

    public getHeaderIndex(headerTitle: string) {
        if (this._data === undefined || this._data === null)
            throw new Error('There is no active data processed');
        let rangeValues = this._data;
        let headers = rangeValues[0];
        return headers.indexOf(headerTitle);
    }

    public updateValue(sheetRow: number, columnIndex: number, value: string) {
        if (this._activeSheet === undefined || this._activeSheet === null)
            throw new Error('There is no active sheet');

        this._activeSheet.getRange(sheetRow, columnIndex).setValue(value);
    }

}