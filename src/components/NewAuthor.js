import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import { Mutation } from 'react-apollo';
import BOOKS from './../queries/books_query';
import {BOOK_CREATE} from "./../queries/books_query";
import AUTHORS from "../queries/author_query";
import { ADD_AUTHOR } from "../queries/author_query";
import Button from "@material-ui/core/Button";
import { MdAddBox } from 'react-icons/md';
import {CreateBookButton} from "./BottunStyle";

const Input = styled.input.attrs(props => ({
    type: "text",
    size: "1em",
}))`
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  color: #282c34;
  font-size: 1em;
  border: 2px solid #282c34;
  border-radius: 3px;
`;

const updateCache = (cache, { data: {createAuthor} }) => {
    const { allAuthors } = cache.readQuery({  query: AUTHORS})
    cache.writeQuery({
        query: AUTHORS,
        data: {
            allAuthors: allAuthors.concat(createAuthor.author)
        }
    })
}

class NewAuthor extends Component {

    input_title;

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            adding: 'no'
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.onCLickEdit = this.onCLickEdit.bind(this)
    }

    onCLickEdit(){
        console.log("Adding new book");
        this.setState({adding: 'yes'});
    }

    handleChangeTitle(event) {
        console.log("Eeey");
        this.setState({title: event.target.value});
    }

    render(){
        if (this.state.adding === 'no'){
            return(
                <div className="add-author">
                    <p></p>
                        <MdAddBox onClick={() => this.onCLickEdit()}/>
                    <p></p>
                </div>
            );
        }
        else {
            return (
                <Mutation mutation={ADD_AUTHOR} update={updateCache}>
                    {createAuthor => (
                        <div className='add-author'>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    createAuthor({variables: {name: this.input_title.value}});

                                    this.input_title.value = '';
                                    this.setState({adding: 'no'});
                                }}
                            >
                                <div class='form-book'>
                                    Name: <Input
                                    ref={node => {
                                        this.input_title = node;
                                    }}
                                />
                                <p></p>
                                    {CreateBookButton()}
                                </div>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }
    }
}

export default NewAuthor;
