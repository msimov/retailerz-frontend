import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Icon, Image, Segment } from "semantic-ui-react";
import { FirebaseContext } from "../context/firebase.context";

const RetailerLinks = () => {
    const firebase = useContext(FirebaseContext);
    
    

    return(
        <Container>
            <Grid doubling columns={3} centered>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/stores'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/products'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/operations'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/measure-units'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/groups'/>
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' href='/inventory'/>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export {RetailerLinks};
