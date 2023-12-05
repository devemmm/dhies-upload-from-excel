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

export const cleanData = (data: any) => {
  switch (data) {
    case "N/A":
    case "none":
    case "None":
      return "";

    default:
      return data;
  }
};
