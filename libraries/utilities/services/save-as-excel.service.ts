import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const _generateExcelFile = (data: Array<any>) => {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data'],
  };

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  return excelBuffer;
};

const _saveFileAsExcel = (buffer: any, fileName: string): void => {
  const data: Blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=uTF-8',
  });

  FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
};

export const saveAsExcel = (data: Array<any>, excelFileName: string = 'excelFile'): void => {
  const excelFile = _generateExcelFile(data);

  _saveFileAsExcel(excelFile, excelFileName);
};

const _fromExcelToJson = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);

    reader.readAsArrayBuffer(file);
  });
};

export const saveAsExcelMultiWorkBooks = (
  workBooks: { data: Array<any>; SheetName: string }[],
  excelFileName: string = 'excelFile',
): void => {
  let Sheets: any = {};
  let SheetNames: string[] = [];

  workBooks.forEach((w) => {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(w.data);
    Sheets[w.SheetName] = worksheet;
    SheetNames.push(w.SheetName);
  });

  const workbook: XLSX.WorkBook = {
    Sheets,
    SheetNames,
  };

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  _saveFileAsExcel(excelBuffer, excelFileName);
};

export const saveExcelAsJson = async (
  file: File,
  jsonFileName: string = 'data',
): Promise<any[]> => {
  const json = await _fromExcelToJson(file);
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  FileSaver.saveAs(blob, `${jsonFileName}_${Date.now()}.json`);
  return json;
};
