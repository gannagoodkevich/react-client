import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import AUTHORS  from "../queries/author_query";
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Author from "./Author";
import NewAuthor from "./NewAuthor";

const useStyles = makeStyles({
    root: {
        minWidth: 500,
        maxWidth: 500,
        minHeight: 250,
        maxHeight: 250,
        display: 'inline-block',
        margin: '15px',
        color: '#282c34',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class AuthorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: 'no'
        };
    }

    render() {
        return (
                <Query query={AUTHORS}>
                    {({ loading, error, data }) => {
                        const classes = useStyles();
                        if (loading) return <div>Fetching..</div>
                        if (error) return <div>Error! ${error.message} </div>
                        return (
                            <div className="flex flex-wrap mb-4">
                                Authors:
                                {data.allAuthors.map((author) => {
                                    return (
                                        <div>
                                                <Author name={author.name} author_id={author.id}  classes={classes}/>
                                        </div>
                                    )
                                })}
                                <Card className={classes.root}>
                                    <CardContent>
                                            <NewAuthor/>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    }}
                </Query>
        )
    }
}

export default AuthorList;
