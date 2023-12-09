import xlsx from "xlsx";
import path from "path";
import { OriginalItem, ResultObject } from "./types";

export const generateExcelFile = async (
  fileName: string,
  headers: any,
  data: any
) => {
  /* generate worksheet and workbook */
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Dates");

  xlsx.utils.sheet_add_aoa(workbook, [headers], { origin: "A1" });

  const filePath = path.join(__dirname, "../public", `${fileName}.xlsx`);
  xlsx.writeFile(workbook, filePath);

  return {
    status: 200,
    message: "data exported successfully",
    record: data.length,
    data: `${process.env.BASE_URL}/${fileName}.xlsx`,
  };
};

export function createArrayOfObjects(
  array: OriginalItem[],
  groupSize: number
): ResultObject[] {
  const result: ResultObject[] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    const group = array.slice(i, i + groupSize);
    const newObj: ResultObject = {};

    group.forEach(({ dataValue, value }) => {
      newObj[dataValue] = value;
    });

    result.push(newObj);
  }

  return result;
}
