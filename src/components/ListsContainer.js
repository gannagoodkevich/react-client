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

const USERS_QUERY = gql`
  query {
    allAuthors{
                            id
                            name
                            books{
                                id
                                title
                                genre
                            }
                          }
  }
`;

const bookList = (
  <div>
  <Query query={USERS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error!</div>
      return (
        <div className="flex flex-wrap mb-4">
        Authors:
        {data.allAuthors.map((author) => {
              return <div key={author.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4"> Author {author.id}:
                  <div className="font-bold text-xl mb-2">{author.name}</div>
                  <p></p>
                  <div className="font-bold text-xl">Books: <p></p> {author.books.map((book) =>{
                    return <div class="card">
                     <div class="container">
                       <h4><b>Title: {book.title}</b></h4>
                       <p>Genre: {book.genre}</p>
                       <p>Written by: {author.name}</p>
                     </div>
                     <p></p>
                    </div>
                  })}
                  </div>
                  <NewBook />
                </div>
              </div>
            })}
        </div>
      )
    }}
  </Query>
  </div>
);



class ListsContainer extends Component {

  componentDidUpdate(prevProps) {
  console.log('Hello world')
}
    render() {
      return (
        bookList
      )
    }
}

export default ListsContainer;
