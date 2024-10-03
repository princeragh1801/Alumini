export interface Event {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: {
      hour: number;
      minute: number;
      second: number;
      millisecond: number;
      microsecond: number;
      nanosecond: number;
      ticks: number;
    };
    endTime: {
      hour: number;
      minute: number;
      second: number;
      millisecond: number;
      microsecond: number;
      nanosecond: number;
      ticks: number;
    };
    location: string;
    registration_Deadline: string;
    status: number;
    approvedBy_Name: string;
    createdBy_Name: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
  }
  