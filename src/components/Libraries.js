import React, { Component } from 'react';
import axios from 'axios';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import LIBRARIES from './../queries/libraries_query';
import BookElement from "./BookElement";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import BOOKS, {DELETE_BOOK} from "../queries/books_query";
import Library from "./Library";


const updateCache = (cache, { data: {deleteBook} }) => {
    const { allBooks } = cache.readQuery({  query: BOOKS})
    //console.log(data, cache)
    console.log(deleteBook.id);
    //console.log(data);
    cache.writeQuery({
        query: BOOKS,
        data: {
            allBooks: allBooks.filter(n => n.id !== deleteBook.id)
        }
    })
}


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
        //deleteBook({ variables: { id: this.props.book_id, authorId: "2"} })
    };

    render() {
        return (
            <div>
                <Query query={LIBRARIES}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching..</div>
                        if (error) return <div>Error! ${error.message} </div>
                        return (
                            <div className="flex flex-wrap mb-4">
                                Libraries:
                                {data.allLibraries.map((library) => {
                                    console.log(library.title)
                                    return (
                                        <Library library_id={library.id} title={library.title} books={library.books} />
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
