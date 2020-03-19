import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const BOOKS = gql`
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


export const BOOK_CREATE = gql`
    mutation createBook($authorId: String!, $title: String!, $genre: String!){
                        createBook(input: {
                          authorId: $authorId
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

export const UPDATE_BOOK = gql`
mutation updateBook($id: String!, $authorId: String!, $title: String!, $genre: String!){
updateBook(input: {
    authorId: $authorId
        id: $id
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
}`;

export default BOOKS;