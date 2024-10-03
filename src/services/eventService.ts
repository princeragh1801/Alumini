import { instance } from "./axiosInstance";

class EventService{
    async getEvents(){
        try {
            const {data} = await instance.get("Event");
            console.log("Data : ", data)
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
}
const eventService = new EventService();
export {eventService}