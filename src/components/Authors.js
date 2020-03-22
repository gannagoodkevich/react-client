import React, { Component } from 'react';
import axios from 'axios';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import AUTHORS  from "../queries/author_query";
import BookElement from "./BookElement";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import BOOKS, {DELETE_BOOK} from "../queries/books_query";
import Library from "./Library";
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import NewBook from "./NewBook";
import LIBRARIES from "../queries/libraries_query";
import Author from "./Author";

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

        this.onCLickEdit = this.onCLickEdit.bind(this);
        this.onCLickDelete = this.onCLickDelete.bind(this);
    }

    onCLickEdit(books_id){
        console.log("Edit pressed");
        console.log(books_id);
        this.setState({editable: 'yes'});
    };

    onCLickDelete(books_id){
        console.log("Delete pressed");
        console.log(books_id);
        this.setState({delete: 'yes'});
        //deleteBook({ variables: { id: this.props.book_id, authorId: "2"} })
    };

    render() {
        return (
            <div>
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
                                        <div className="add-book">
                                            <NewBook library={this.props.author_id}/>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default AuthorList;
