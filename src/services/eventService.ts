
import { useMemo } from "react";
import useAxios from "./axiosInstance";
import axios, { AxiosInstance } from "axios";
import { EventAdd } from "../interfaces/event";

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
    async addEvent(event: EventAdd) {
        try {
            console.log("Event data:", event);
    
            const formData = new FormData();
            formData.append('Name', event.name);
            formData.append('Description', event.description);
            formData.append('Location', event.location);
            formData.append('StartDate', event.startDate.toISOString().split('T')[0]); // YYYY-MM-DD
            formData.append('EndDate', event.endDate.toISOString().split('T')[0]);
            // formData.append('startTime', event.startTime.toTimeString().split(' ')[0]); // HH:MM:SS
            // formData.append('endTime', event.endTime.toTimeString().split(' ')[0]);
            formData.append('RegistrationDeadline', event.registration_Deadline.toISOString().split('T')[0]);
    
            // Append media files
            event.mediaFiles.forEach((file, index) => {
                formData.append('MediaFiles[]', {
                    uri: file.uri,    // The URI from the selected image
                    type: file.type,  // File type like 'image/png'
                    name: file.name,  // Original file name, like 'toothbrush.png'
                });
            });
    
            console.log("Form data:", formData);
    
            const { data } = await this.instance.post('Event/Add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log("Event upload:", data);
            return data;
    
        } catch (error: any) {
            console.error("Error:", error.message);
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