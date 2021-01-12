import { TextField } from "@material-ui/core"
import { Controller } from "react-hook-form"

const FormTextField = (props) => {
    
    const {name, label, control, type, step} = props;

    return(
        <Controller 
            as={
                <TextField
                    label={label}
                    type={type}
                    step={step}
                />
            }
            name={name}
            control={control}
            defaultValue=""
        />
    )
}

export {FormTextField};