import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import NewBook from './NewBook';
import BOOKS from './../queries/books_query';
import BookElement from "./BookElement";


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

const bookList = (
  <div>
  <Query query={BOOKS}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error! ${error.message} </div>
      return (
        <div className="flex flex-wrap mb-4">
        Books:
          <p></p>
        {data.allBooks.map((book) => {
                    console.log(book.author.name)
                    return <div className="card">
                      <BookElement book_id={book.id} title={book.title} genre={book.genre} author={book.author.name} />
                     <p></p>
                    </div>
                  })}
                  <NewBook />
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
