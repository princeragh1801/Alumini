import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../../interfaces/event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.info}>{event.location}</Text>
      
      <Text style={styles.label}>Start Date:</Text>
      <Text style={styles.info}>{new Date(event.startDate).toLocaleDateString()}</Text>

      <Text style={styles.label}>End Date:</Text>
      <Text style={styles.info}>{new Date(event.endDate).toLocaleDateString()}</Text>

      <Text style={styles.label}>Registration Deadline:</Text>
      <Text style={styles.info}>{new Date(event.registration_Deadline).toLocaleDateString()}</Text>

      <Text style={styles.label}>Approved By:</Text>
      <Text style={styles.info}>{event.approvedBy_Name}</Text>

      <Text style={styles.label}>Created By:</Text>
      <Text style={styles.info}>{event.createdBy_Name}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.info}>{event.status === 0 ? 'Pending' : 'Approved'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventCard;
