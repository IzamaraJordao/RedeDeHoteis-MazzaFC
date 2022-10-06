import { Props } from './types'

import { Controller, useForm } from 'react-hook-form'


export function InputS(props: Props) {
  const {
    control,
    formState: { errors },
  } = useForm()
  
  return (
    <>
      <Controller
        name={props.name}
        control={control}
        defaultValue={!!props.default ? props.default : ''}
        render={({ field }) => (
          <input
            {...field}
            data-test={`input-${props.name}`}
          />
        )}
      />
         <p>{errors[props.name]?.message as string}</p>
    </>
  )
}

