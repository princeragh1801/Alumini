import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or any other icon library of your choice
import { Event } from '../../interfaces/event';
import { formatTime } from '../../utils/timeFormat';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.name.length > 30 ? `${event.name.substring(0, 27)}...` : event.name}</Text>
      <Text style={styles.description}>{event.description.length > 60 ? `${event.description.substring(0, 57)}...` : event.description}</Text>
      
      <View style={styles.infoContainer}>
        <Icon name="map-marker" size={18} color="#d27511" />
        <Text style={styles.info}>{event.location}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Icon name="calendar" size={18} color="#d27511" />
        <Text style={styles.info}>{formatTime(event.startDate)}</Text>
      </View>

      {/* <View style={styles.infoContainer}>
        <Icon name="clock-o" size={18} color="#d27511" />
        <Text style={styles.info}>{formatTime(event.endDate)}</Text>
      </View> */}

      <View style={styles.infoContainer}>
        <Icon name="calendar-minus-o" size={18} color="#d27511" />
        <Text style={styles.info}>{formatTime(event.registration_Deadline)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Approved By:</Text>
        <Text style={styles.info}>{event.approvedBy_Name || 'N/A'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Created By:</Text>
        <Text style={styles.info}>{event.createdBy_Name || 'N/A'}</Text>
      </View>

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
    fontSize : 15,
    //marginTop: 8,
  },
  info: {
    fontSize: 18,
    color: '#666',
    marginLeft : 15,
    fontWeight : 'semibold'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default EventCard;
