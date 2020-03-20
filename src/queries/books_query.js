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

export const ADD_BOOK_TO_LIBRARY = gql`
    mutation createBookToLibrary($libraryId: String!, $authorId: String!, $title: String!, $genre: String!){
                        createBook(input: {
                          authorId: $authorId
                          libraryId: $libraryId
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

export const DELETE_BOOK = gql`mutation deleteBook($id: String!, $authorId: String!){
deleteBook(input: {
    authorId: $authorId
        id: $id
            })
{
    id
    errors
}
}`;
export default BOOKS;