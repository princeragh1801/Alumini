import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Event } from '../interfaces/event';
import { eventService } from '../services/eventService';
import Loading from './Loading';
import EventCard from '../components/Card/EventCard';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const eventData: Event = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Event Name",
    description: "This is a description of the event.",
    startDate: "2024-10-02T06:07:01.795Z",
    endDate: "2024-10-02T06:07:01.795Z",
    startTime: {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0,
      ticks: 0,
    },
    endTime: {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0,
      ticks: 0,
    },
    location: "Event Location",
    registration_Deadline: "2024-10-02T06:07:01.795Z",
    status: 0,
    approvedBy_Name: "Approver Name",
    createdBy_Name: "Creator Name",
    createdOn: "2024-10-02T06:07:01.795Z",
    createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    updatedOn: "2024-10-02T06:07:01.795Z",
    updatedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  };
  
  // useEffect(() => {
  //   // IIFE to handle async inside useEffect
  //   (async () => {
  //     try {
  //       const data: Event[] = await eventService.getEvents();
  //       setEvents(data);
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.error("Failed to fetch blogs:", error);
  //     }
  //   })(); // Immediately Invoked Function Expression (IIFE)
  // }, []);
  // if(isLoading){
  //   return (
  //     <Loading/>
  //   )
  // }
  return (
    <ScrollView style={styles.container}>
      {/* {events != null && events.length > 0 && events.map((event) => ( */}
        <EventCard key={eventData.id} event={eventData} />
      {/* ))} */}
    </ScrollView>
  )
}

export default Events

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
    txt : {
        fontWeight:'bold',
        color : '#d27511',
        fontSize:20
    }
})