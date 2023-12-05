import dotenvFlow from "dotenv-flow";
import xlsx from "xlsx";
import fs from "fs";
import axios from "axios";
import { DHIS2Request, Event, DataElement } from "./DataModule";
import { DHIS2_DEFINITION } from "./dhis2-uuid.definitions";
import { convertNames, convertGender, cleanData } from "./helperFunctions";

dotenvFlow.config();

const defaultValue: Event = {
  occurredAt: new Date().toISOString().split("T")[0],
  status: "COMPLETED",
  notes: new Array(),
  completedAt: new Date().toISOString().split("T")[0],
  program: process.env.PROGRAM,
  programStage: process.env.PROGRAM_STAGE,
  orgUnit: process.env.ORG_UNIT,
};

const request: DHIS2Request = {
  events: [
    {
      ...defaultValue,
      dataValues: [
        {
          dataElement: "D7sqCcNSF1i",
          value: 1,
        },
        // ... (other data values)
      ],
    },
    // ... (other events)
  ],
};

// --------------DHIES2 REQUEST MAPPING FROM EXCEL------------------

let workbook = xlsx.readFile(process.env.EXCEL_FILE);
let worksheet = workbook.Sheets[workbook.SheetNames[1]];
let range = xlsx.utils.decode_range(worksheet["!ref"]);

for (let row = range.s.r; row <= range.e.r; row++) {
  let data = [];

  for (let col = range.s.c; col <= range.e.c; col++) {
    let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];

    if (cell) {
      data.push(cell.v);
    }
  }

  if (data && data.length > 0) {
    const { fname, mname, lname } = convertNames(cleanData(data[4]));

    const dataValues: Array<DataElement> = [
      {
        dataElement: DHIS2_DEFINITION.EXCEL_ID,
        value: cleanData(data[0]),
      },
      {
        dataElement: DHIS2_DEFINITION.CH_UINIQUE_ID, // FEFAULT
        value: cleanData(data[0]),
      },
      {
        dataElement: DHIS2_DEFINITION.PRIMARY_FACILITY,
        value: "LHNiyIWuLdc", // DEFAULT PRIMARY CAFILITY ["hWBXenUpw50"]
      },
      {
        dataElement: DHIS2_DEFINITION.FIRST_NAME,
        value: fname,
      },
      {
        dataElement: DHIS2_DEFINITION.MIDDLE_NAME,
        value: mname,
      },
      {
        dataElement: DHIS2_DEFINITION.LAST_NAME,
        value: lname,
      },
      {
        dataElement: DHIS2_DEFINITION.GENDER,
        value: convertGender(cleanData(data[5])),
      },
      // {
      //   dataElement: DHIS2_DEFINITION.EDUCATION_HIGHEST,
      //   value: cleanData(data[8]),
      // },
      {
        dataElement: DHIS2_DEFINITION.CONTRACT_TYPE,
        value: cleanData(data[6]),
      },
      // {
      //   dataElement: DHIS2_DEFINITION.NATINAL_ID,
      //   value: cleanData(data[10]),
      // },
      {
        dataElement: DHIS2_DEFINITION.MOBILE_NUMBER,
        value: cleanData(data[11]),
      },
      {
        dataElement: DHIS2_DEFINITION.PRIMARY_COMMUNITY_COVERING,
        value: cleanData(data[8]),
      },
      {
        dataElement: DHIS2_DEFINITION.STATUS, // default value for CHW status ==> active
        value: "true",
      },
      {
        dataElement: DHIS2_DEFINITION.CONTRACT_START_DATE, // DEFAULT
        value: process.env.DEFAULT_CONTRACT_START_DATE,
      },
      {
        dataElement: DHIS2_DEFINITION.CONTRACT_END_DATE, // FEFAULT
        value: process.env.DEFAULT_CONTRACT_END_DATE,
      },
    ];

    request.events.push({ ...defaultValue, dataValues });
  }
}

// ---------- remove initialization object from the first index ------------
request.events.shift();

// -------------SEND REQUEST TO DHIS2 SERVER ----------------------------

axios
  .post(process.env.API_URL, request, {
    auth: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    },
  })
  .then((response) => {
    fs.writeFile(
      "success-respose.txt",
      JSON.stringify(response.data),
      function (err) {
        if (err) throw err;
      }
    );
  })
  .catch((error) => {
    fs.writeFile(
      "error-respose.txt",
      JSON.stringify(error.response.data),
      function (err) {
        if (err) throw err;
      }
    );
  })
  .finally(() => {
    fs.writeFile(
      "final-respose.txt",
      "script already excuted please check if there is some error in error-response.tx file or there is success response in success-respose.txt file",
      function (err) {
        if (err) throw err;
      }
    );
  });
