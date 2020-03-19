import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import { Mutation } from 'react-apollo';
import BOOKS from './../queries/books_query';
import {BOOK_CREATE} from "./../queries/books_query";

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: #282c34;
  border: 2px solid #282c34;
`;

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

class NewBook extends Component {

    input_title;
    input_genre;

    constructor(props) {
        super(props);
        this.state = {title: ''};

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }


    handleChangeTitle(event) {
      console.log("Eeey");
      this.setState({title: event.target.value});
    }

    render(){
       return (
         <Mutation mutation={BOOK_CREATE} update={updateCache}>
            {createBook => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createBook({ variables: { authorId: "2", title: this.input_title.value, genre: this.input_genre.value } });

                    this.input_title.value = '';
                    this.input_genre.value = '';
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

export default NewBook;
