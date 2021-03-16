import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Image } from "semantic-ui-react";
import { FirebaseContext } from "../context/firebase.context";

const CustomerLinks = () => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    
    return(
        <Container>
            <Grid doubling columns={2} centered>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/profile'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/cart'/>
                </Grid.Column>
            </Grid>
        </Container>
    );
}


export {CustomerLinks};
