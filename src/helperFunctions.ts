export const convertNames = (names: string) => {
  let fname = "";
  let mname = "";
  let lname = "";

  if (names.length > 0) {
    fname = names.split(" ")[0];
    mname = names.split(" ")[1];
    lname = names.split(" ")[2];
  }

  if (!mname) {
    mname = "";
    lname = "";
  }

  if (mname && !lname) {
    mname = "";
    lname = names.split(" ")[1];
  }

  return { fname, mname, lname };
};

export const convertGender = (gender: string) => {
  switch (gender) {
    case "M":
    case "Male":
    case "MALE":
      return "Male";
    case "F":
    case "Female":
    case "FEMALE":
      return "Female";
    default:
      break;
  }
};

export const requesttt = {
  events: [
    {
      occurredAt: "2023-12-03",
      status: "COMPLETED",
      notes: [""],
      completedAt: "2023-12-03",
      program: "AEyQugQ5Qo3",
      programStage: "DNUlZWbDVWa",
      orgUnit: "LHNiyIWuLdc",
      dataValues: [
        {
          dataElement: "D7sqCcNSF1i",
          value: 1,
        },
        {
          dataElement: "hWBXenUpw50",
          value: "LHNiyIWuLdc",
        },
        {
          dataElement: "dsW4kE7Tuih",
          value: "Emmanuel",
        },
        {
          dataElement: "soXyqvD4the",
          value: "devemm",
        },
        {
          dataElement: "iYmK2qurx5q",
          value: "NTIVUGURUZWA",
        },
        {
          dataElement: "NIDXWhlaOsZ",
          value: "Male",
        },
        {
          dataElement: "We5TeSA9xLB",
          value: "Master's",
        },
        {
          dataElement: "vOiRYRjOkUR",
          value: "CHA",
        },
        {
          dataElement: "mKQ4a3PvlJ4",
          value: "8250730571", // NATINAL ID
        },
        {
          dataElement: "dqxVrWltE4q",
          value: "0886242548", // MOBILE NUMBER
        },
        {
          dataElement: "Z8iVkeDaj1Y",
          value: "Lower Zor Clinic", // PRIMARY COMMUNITY COVERING
        },
        {
          dataElement: "QL3HEgnRjSL",
          value: "true", // default value for CHW status ==> active
        },
        {
          dataElement: "TTuXqMRwB49",
          value: "2024-01-01", // default value  for contract start date
        },
        {
          dataElement: "g9vq4l30HJ2",
          value: "2024-12-31", // default value for contactract ended date
        },
        {
          dataElement: "ssQx02nnFX6",
          value: "1", // same as ecell unique id
        },
      ],
    },
  ],
};
