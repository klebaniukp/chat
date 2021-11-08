import React from 'react';
import { FormInput } from '../atoms/Input/FormInput';

export const FormField = (props: { value: string; inputType: string }) => {
    return (
        <div className='form-floating mb-3'>
            <FormInput inputType={props.inputType} />
            <label htmlFor='floatingInput'>{props.value}</label>
        </div>
    );
};
