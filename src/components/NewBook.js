import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import { Mutation } from '@apollo/react-components';

const BOOK_CREATE = gql`
    mutation createBook($title: String!, $genre: String!){
                        createBook(input: {
                          authorId: "1"
                          title: $title
                          genre: $genre
                        })
                        {
                          book {
                            id
                            title
                            genre
                            author{
                              id
                              name
                            }
                          }
                          errors
                        }
                      }
`;

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

class NewBook extends Component {

    input_title
    input_genre

    constructor(props) {
        super(props);
        this.state = {title: ''};

        this.createBook = this.createBook.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }

    createBook(event){
      console.log("Hello Wolrd");
    }

    handleChangeTitle(event) {
      console.log("Eeey");
      this.setState({title: event.target.value});
    }

    render(){
       return (
         <Mutation mutation={BOOK_CREATE}>
            {createBook => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createBook({ variables: { title: this.input_title.value, genre: this.input_genre.value } });

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
