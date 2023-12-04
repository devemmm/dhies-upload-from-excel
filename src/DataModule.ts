export interface Event {
  occurredAt: string;
  status: "COMPLETED" | "IN_PROGRESS" | "CANCELLED";
  notes: Array<string>;
  completedAt: string;
  program: string;
  programStage: string;
  orgUnit: string;
  dataValues?: Array<DataElement>;
}

export interface DataElement {
  dataElement: string;
  value: string | number | boolean;
}

export interface DHIS2Request {
  events: Array<Event>;
}
