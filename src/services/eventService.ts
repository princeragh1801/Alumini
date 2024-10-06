
import { useMemo } from "react";
import useAxios from "./axiosInstance";
import axios, { AxiosInstance } from "axios";

class EventsService{
    instance : AxiosInstance

    constructor(axiosInstance : AxiosInstance){
        this.instance = axiosInstance;
    }
    async getEvents(){
        try {
            const {data} = await this.instance.get("Event");
            console.log("Data : ",data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getEventById(eventId : string){
        try {
            const {data} = await this.instance.get(`Event/${eventId}`);
            console.log("Data : ",data);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    // TODO :: 
    async addEvent(event : Event){
        try {
            const data = await axios.post('Event', event, {
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'text/plain',
                  'Authorization': `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiUHJpbmNlIFJhZ2h1d2Fuc2hpIiwiSWQiOiI0NjE0OWVlNy0xNjIzLTQ3OWMtYjg2Ny0wOGRjZTM4ZTA2MDYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiR21haWwiOiJwcmluY2VyYWdodXdhbnNoaV9jc2UyMUBnZ2N0LmNvLmluIiwiZXhwIjoxNzI4NDY4NzY1LCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9._tGnkVZfX78Bc8QtLVBYkzP7sS74pdOFEbW_Tnkcntw` // Replace with your token
                }
              });
              console.log("Event upload : ", data);
              return data;
        } catch (error : any) {
            console.log("Error : ", error.message);
            console.error(error);
        }
    }
}
const useEventService = ()=>{
    const axiosInstance = useAxios();

  // useMemo to create the service instance only when axiosInstance changes
  const authService = useMemo(() => new EventsService(axiosInstance), [axiosInstance]);

  return authService;
};
export default useEventService;