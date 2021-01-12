import { Button } from "@material-ui/core";

const FormButton = (props) => {
    const {label, type, disabled} = props;
    return (
        <Button 
            type={type}
            disabled={disabled}
        >
            {label}
        </Button>
    )
}

export default FormButton;