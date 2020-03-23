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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import AUTHORS from "../queries/author_query";
import Author from "./Author";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
        this.state = {
            adding: 'no',
            selected: ''};

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    handleChangeTitle(event) {
      console.log("Eeey");
      this.setState({title: event.target.value});
    }

    onCLickEdit(){
        console.log("Adding new book");
        this.setState({adding: 'yes'});
    }

    onChange(event){
        this.setState({selected: event.target.value});
    }

    render(){
        if (this.state.adding === 'no'){
            return(
                <div className="add-book">
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
                            <div className="adding">
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        createBook({ variables: { authorId: this.state.selected, title: this.input_title.value, genre: this.input_genre.value } });

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
                                        <Query query={AUTHORS}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <div>Fetching..</div>
                                                if (error) return <div>Error! ${error.message} </div>
                                                return (
                                                    <div>
                                                        Author: <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.selected}
                                                            onChange={this.onChange}
                                                        >

                                                            {data.allAuthors.map((author) => {
                                                                             return (
                                                                                  <MenuItem value={author.id}>{author.name}</MenuItem>
                                                                              )
                                                                        })}
                                                        </Select>
                                                    </div>
                                                )
                                            }}
                                        </Query>
                                    </div>
                                        <p></p>
                                    <div className="book-button">
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
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        create_book_for_library({ variables: { libraryId: this.props.library, authorId: this.state.selected, title: this.input_title.value, genre: this.input_genre.value } });

                                        this.input_title.value = '';
                                        this.input_genre.value = '';
                                        this.setState({adding: 'no'});
                                    }}
                                >
                                    <div className='adding'>
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
                                        <Query query={AUTHORS}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <div>Fetching..</div>
                                                if (error) return <div>Error! ${error.message} </div>
                                                return (
                                                    <div>
                                                        Author: <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.selected}
                                                            onChange={this.onChange}
                                                        >

                                                            {data.allAuthors.map((author) => {
                                                                return (
                                                                    <MenuItem value={author.id}>{author.name}</MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </div>
                                                )
                                            }}
                                        </Query>
                                    </div>
                                        <p></p>
                                    <div className="book-button">
                                        <Button type="submit">Add book</Button>
                                    </div>
                                </form>
                        )}
                    </Mutation>
                );
            }
        }
    }
}

export default NewBook;
