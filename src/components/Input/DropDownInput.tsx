import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DropDownInputProps } from '../../interfaces/input'
import { Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'

const DropDownInput = ({
    control,
    name,
    errorMessage,
    options,
    rules,
    labelName,
    ...props
} : DropDownInputProps) => {
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
                <Picker.Item key={`Select your ${labelName}`} label={`Select your ${labelName}`} value={'0'} />
                {options.map((option) => <Picker.Item key={option.id} label={option.name} value={option.id} />)}
             
            </Picker>
          )}
          name={name}
          rules={rules}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
  )
}

export default DropDownInput


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