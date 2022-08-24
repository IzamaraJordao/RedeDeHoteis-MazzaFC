import React from "react";
import { Input } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { Props } from "./types";

export function InputComp(props:Props){
   const {
    control,
    formState: { errors },
    } = useForm();

    return (
        <>
          <Controller
            name={props.email}
            control={control}
            defaultValue={!!props.default ? props.default : ""}
            render={({ field }) => (
              <Input {...field} data-test={`input-${props.email}`} />
            )}
          />
          <p>{errors[props.email]?.message}</p>
        </>
      );
    }
