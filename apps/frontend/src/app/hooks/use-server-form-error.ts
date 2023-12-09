import { useEffect, useState } from "react";
import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form"
import { IErrorResponse } from "@fit-friends/shared";

export const useServerFormError = <F extends FieldValues>(setError: UseFormSetError<F>, errors: IErrorResponse | null) => {
    const [formError, setFormError] = useState<string>();

    useEffect(() => {
        setFormError('');
        if (errors && errors.message instanceof Array) {
            errors.message.forEach((err) => {
                setError(err.field as FieldPath<F>, {message: err.error})
            }) 
        }

        if (errors && !Array.isArray(errors) && errors.statusCode === 422) {
            setFormError(errors.message as string)
        }
    }, [errors, setError]);

    return {formError, setFormError};
}