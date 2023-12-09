import dotenvFlow from "dotenv-flow";
import xlsx from "xlsx";
import axios from "axios";
import path from "path";
import express, { Request, Response } from "express";
import { ResultObject } from "./types";
import { headers } from "./constants";
import { generateExcelFile, createArrayOfObjects } from "./helperFunctions";

dotenvFlow.config();
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/", (req: Request, res: Response) => {
  res.json({ status: 200, message: "OK" });
});

app.get("/export-data", async (req: Request, res: Response) => {
  const response = await axios.get(process.env.DATA_EXPORT_URL, {
    auth: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    },
  });

  const dhies2Data: ResultObject[] = [];
  response.data.instances.forEach((instance: any) => {
    const personalData: ResultObject = {};
    instance.dataValues.forEach(({ dataElement, value }: any) => {
      personalData[dataElement] = value;
    });

    dhies2Data.push(personalData);
  });

  const { status, message, record, data } = await generateExcelFile(
    "test",
    headers,
    dhies2Data
  );

  try {
    res.status(status).json({ status, message, record, data });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.get("/convert", async (req: Request, res: Response) => {
  try {
    let workbook = xlsx.readFile(process.env.EXCEL_FILE);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let range = xlsx.utils.decode_range(worksheet["!ref"]);

    let container = [];

    for (let row = range.s.r; row <= range.e.r; row++) {
      let data = [];

      for (let col = range.s.c; col <= range.e.c; col++) {
        let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];

        if (cell) {
          data.push(cell.v);
        }
      }

      if (data && data.length > 0) {
        container.push({ dataValue: data[0], value: data[1] });
      }
    }

    container.shift();
    const groupSize = 15;
    const resultArray: ResultObject[] = createArrayOfObjects(
      container,
      groupSize
    );

    const { status, message, record, data } = await generateExcelFile(
      "test",
      headers,
      resultArray
    );

    res.status(status).json({ status, message, record, data });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// CONFIGURE APP PORT
app.listen(process.env.PORT, () =>
  console.log(`server listening on ${process.env.PORT}`)
);
