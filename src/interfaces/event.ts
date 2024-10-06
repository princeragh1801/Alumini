export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string; // You can also use Date if you plan to convert it
  endDate: string;   // Same as above
  startTime: string; // Can be Date or string based on your requirements
  endTime: string;   // Can be Date or string based on your requirements
  location: string;
  registration_Deadline: string; // Can also be Date
  status: number;
  approvedBy_Name: string | null;
  createdBy_Name: string;
  createdOn: string; // Can also be Date
  createdBy: string;
  updatedOn: string | null;
  updatedBy: string | null;
}