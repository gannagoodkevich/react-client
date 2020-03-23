import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { MdAddBox } from 'react-icons/md';
import { Mutation } from 'react-apollo';
import BOOKS from './../queries/books_query';
import {BOOK_CREATE} from "./../queries/books_query";
import { LIBRARIES } from "../queries/libraries_query";
import LIBRARY from "../queries/libraries_query";
import {ADD_BOOK_TO_LIBRARY} from "../queries/libraries_query";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
    type: "text",
    size: "0.5em",
}))`
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  color: #282c34;
  font-size: 0.5em;
  border: 2px solid #282c34;
  border-radius: 2px;
`;

const updateCache = (cache, { data: {createBook} }) => {
  const { allBooks } = cache.readQuery({  query: BOOKS})
  //console.log(data, cache)
  //console.log("Hello");
  cache.writeQuery({
    query: BOOKS,
    data: {
      allBooks: allBooks.concat(createBook.book)
    }
  })
}

const updateCacheLibrary = (cache, { data: {createBookForLibrary} }) => {
    const { allBooks } = cache.readQuery({  query: BOOKS})
    //console.log(data, cache)
    //console.log("Hello");

    const { allLibraries } = cache.readQuery({  query: LIBRARIES });
    //console.log(data, cache)
    console.log(createBookForLibrary.book);
    console.log(allLibraries);
    const mappedArray = allLibraries.map((library) => {
        if (library.id === createBookForLibrary.libraryId){
            console.log("Yeppy")
            library.books = library.books.concat(createBookForLibrary.book);
        }
        return library
    });
    //console.log(mappedArray);
    cache.writeQuery({
        query: LIBRARIES,
        data: {
            allLibraries: allLibraries
        }
    })

    cache.writeQuery({
        query: BOOKS,
        data: {
            allBooks: allBooks.concat(createBookForLibrary.book)
        }
    })
}

class NewBook extends Component {

    input_title;
    input_genre;

    constructor(props) {
        super(props);
        this.state = {adding: 'no'};

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }


    handleChangeTitle(event) {
      console.log("Eeey");
      this.setState({title: event.target.value});
    }

    onCLickEdit(){
        console.log("Adding new book");
        this.setState({adding: 'yes'});
    }

    render(){
        if (this.state.adding === 'no'){
            return(
                <div>
                    <p></p>
                        <MdAddBox onClick={() => this.onCLickEdit()}/>
                    <p></p>
                </div>
            );
        }
        else {
            if (this.props.library === 'no'){
                return (
                    <Mutation mutation={BOOK_CREATE} update={updateCache}>
                        {createBook => (
                            <div>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        createBook({ variables: { authorId: "12", title: this.input_title.value, genre: this.input_genre.value } });

                                        this.input_title.value = '';
                                        this.input_genre.value = '';
                                        this.setState({adding: 'no'});
                                    }}
                                >
                                    <div class='form-book'>
                                        Title: <Input
                                        ref={node => {
                                            this.input_title = node;
                                        }}
                                    />
                                        <p></p>
                                        Genre: <Input
                                        ref={node => {
                                            this.input_genre = node;
                                        }}
                                    />
                                        <p></p>
                                        <Button type="submit">Add book</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Mutation>
                );
            }
            else {
                return (
                    <Mutation mutation={ADD_BOOK_TO_LIBRARY} update={updateCacheLibrary}>
                        {create_book_for_library => (
                            <div>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        create_book_for_library({ variables: { libraryId: this.props.library, authorId: "2", title: this.input_title.value, genre: this.input_genre.value } });

                                        this.input_title.value = '';
                                        this.input_genre.value = '';
                                        this.setState({adding: 'no'});
                                    }}
                                >
                                    <div class='form-book'>
                                        Title: <Input
                                        ref={node => {
                                            this.input_title = node;
                                        }}
                                    />
                                        <p></p>
                                        Genre: <Input
                                        ref={node => {
                                            this.input_genre = node;
                                        }}
                                    />
                                        <p></p>
                                        <Button type="submit">Add book</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Mutation>
                );
            }
        }
    }
}

export default NewBook;
