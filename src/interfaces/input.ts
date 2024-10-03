import { Control } from "react-hook-form";
import { IdAndName } from "./shared";



export  interface EnumInputProps {
    control: Control<any>;
    name: string;
    rules?: object;
    errorMessage?: string;
    [key : string] : any;
  }

  export interface DropDownInputProps extends EnumInputProps{
    options : IdAndName[],
    labelName : string
  }
  export interface InputProps extends EnumInputProps {

    placeholder: string;
    secureTextEntry?: boolean;
  }