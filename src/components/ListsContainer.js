import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import NewBook from './NewBook';

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

const BOOKS = gql`
  {
                          allBooks{
                            id
                            title
                            genre
                            author{
                              id
                              name
                            }
                          }
                        }
`;

const bookList = (
  <div>
  <Query query={BOOKS}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error! ${error.message} </div>
      return (
        <div className="flex flex-wrap mb-4">
        Books:
        {data.allBooks.map((book) => {
                    console.log(book.author.name)
                    return <div>
                    <div class="card">
                     <div class="container">
                       <h4><b>Title: {book.title}</b></h4>
                       <p>Genre: {book.genre}</p>
                       <p>Written by: {book.author.name}</p>
                     </div>
                     <p></p>
                    </div>
                  </div>
                  })}
                  <NewBook />
                  <button onClick={() => refetch()}>Refetch!</button>
        </div>
      )
    }}
  </Query>
  </div>
);



class ListsContainer extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
        bookList
      )
    }
}

export default ListsContainer;
