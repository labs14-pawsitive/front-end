import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.jsx";

const styles = theme => ({
    media: {
        height: 200
    },
    card: {
       
        height: 250,
        boxShadow: "2px 4px 5px -1px rgba(0,0,0,0.49)"
    }
});

class AnimalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: true
        }
    }

    onMouseEnter = () => {
        this.setState({
            hover: false
        })
    }

    onMouseLeave = () => {
        this.setState({
            hover: true
        })
    }

    render() {
        const { classes } = this.props;

        const customStyle = {
            media: {
                height: 200,
                maxHeight: 250,
                transitionY: "maxHeight 0.5s ease-out",
                borderBottomLeftRadius:"50% 10%",
                borderBottomRightRadius:"50% 10%"
            },
            card: {
                height: 250,
                boxShadow: "2px 4px 5px -1px rgba(0,0,0,0.49)"
            },
            CardContent:{
                height:275
            }
        };

        return (
            <GridItem xs={12} sm={10} md={4}>
                <Card
                        component="p"
                        className={classes.card}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    >
                    {this.state.hover ?
                        
                        <CardActionArea >
                            <CardMedia
                                className={classes.media}
                                image={this.props.animal.img_url}
                                title="Animal"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.props.animal.name}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        
                        :

                        <CardActionArea >
                            <CardMedia
                                // className={classes.media}
                                style={customStyle.media}
                                // image={this.state.url}
                                image={this.props.animal.img_url}
                                title="Animal"
                            />
                            <CardContent style={customStyle.CardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                   {this.props.animal.name}
                                </Typography>

                                <Typography component="p">Girl</Typography>
                            </CardContent>
                        </CardActionArea>
                       
                    }
                </Card>
            </GridItem>
        )
    }
}

export default withStyles(styles)(AnimalCard);
