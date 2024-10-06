import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Event } from '../interfaces/event';
import Loading from './Loading';
import EventCard from '../components/Card/EventCard';
import NoContent from './NoContent';
import useEventService from '../services/eventService';
import { ApiResponse } from '../interfaces/response';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const eventService = useEventService();
  
  useEffect(() => {
    // IIFE to handle async inside useEffect
    (async () => {
      try {
        const data: ApiResponse<Event[]> = await eventService.getEvents();
        setEvents(data.data);
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })(); // Immediately Invoked Function Expression (IIFE)
  }, []);
  if(isLoading){
    return (
      <Loading/>
    )
  }else if(events == null || events.length == 0){
    return <NoContent/>
  }
  return (
    <ScrollView style={styles.container}>
      {events != null && events.length > 0 && events.map((event) => <EventCard key={event.id} event={event}/>)}
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