import React, { Component } from 'react';
import {Query} from 'react-apollo';
import LIBRARIES from './../queries/libraries_query';
import Library from "./Library";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 500,
        maxWidth: 500,
        minHeight: 350,
        maxHeight: 600,
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

class LibraryList extends Component {
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
    };

    render() {
        return (
            <div>
                <Query query={LIBRARIES}>
                    {({ loading, error, data }) => {
                        const classes = useStyles();
                        if (loading) return <div>Fetching..</div>
                        if (error) return <div>Error! ${error.message} </div>
                        return (
                            <div className="flex flex-wrap mb-4">
                                Libraries:
                                {data.allLibraries.map((library) => {
                                    return (
                                        <div>
                                            <Library library_id={library.id} title={library.title} books={library.books} classes={classes} />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default LibraryList;
