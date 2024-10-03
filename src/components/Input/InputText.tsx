import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, { Ref, useId } from 'react';
import {InputProps} from '../../interfaces/input';
import {Controller} from 'react-hook-form';

const InputText = React.forwardRef<TextInput, InputProps>(
  function InputText({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  rules,
  errorMessage,
  ...props
}, ref:Ref<TextInput>) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
          key={useId()}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            
            ref={ref}
            {...props}
          />
        )}
        name={name}
        rules={rules}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputText;
