import { Control } from "react-hook-form";
import { IdAndName } from "./shared";

type OnChangeFunction = (...event: any[]) => void;


export  interface EnumInputProps {
    name: string;
    rules?: object;
    errorMessage?: string;
    [key : string] : any;
  }

  export interface DropDownInputProps{
    value : string,
    onChange : OnChangeFunction,
    options : IdAndName[],
    labelName : string
  }
  export interface InputProps extends EnumInputProps {

    placeholder: string;
    secureTextEntry?: boolean;
  }