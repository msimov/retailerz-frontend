import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form"

const FormSelect = (props) => {
    const {name, label, options, control} = props;
    
    return(
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Controller
                control={control}
                name = {name}
                defaultValue=""
                as={
                    <Select>
                        {options.map(({key, label}) => {
                            return <MenuItem key={key} value={key}>
                                {label}
                            </MenuItem>
                        })}
                    </Select>
                }
            />
        </FormControl>
    )
} 

export default FormSelect;