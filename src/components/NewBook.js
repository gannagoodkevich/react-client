import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import { Mutation } from '@apollo/react-components';

const BOOK_CREATE = gql`
    mutation {
                        createBook(input: {
                          authorId: "1"
                          title: "$title"
                          genre: "genre_1"
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

class NewBook extends Component {

    input

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
                    createBook({ variables: { title: this.input.value } });

                    this.input.value = '';
                  }}
                >
                  <input
                    ref={node => {
                      this.input = node;
                    }}
                  />
                  <button type="submit">Update Todo</button>
                </form>
              </div>
            )}
          </Mutation>
      );
    }
}

export default NewBook;
