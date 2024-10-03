import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EnumInputProps } from '../../interfaces/input';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { Role } from '../../interfaces/enums';

const EnumInput = ({
    control,
    name,
    errorMessage,
    rules,
    ...props
  }: EnumInputProps) => {
    return (
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              style={styles.picker}
              onValueChange={onChange}
            >
                <Picker.Item key={Role.Student} label="Student" value={Role.Student} />
                <Picker.Item key={Role.Faculty} label="Faculty" value={Role.Faculty} />
                <Picker.Item key={Role.Admin} label="Admin" value={Role.Admin} />
             
            </Picker>
          )}
          name={name}
          rules={rules}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    picker: {
      height: 50,
    },
    error: {
      color: 'red',
      marginTop: 5,
    },
  });
  
  export default EnumInput;