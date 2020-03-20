import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const LIBRARIES = gql`
{
                    allLibraries{
                            id
                            title
                            books{
                              id
                              title
                              genre
                            }
                          }
                          }
`;

export const UPDATE_LIBRARY = gql`
mutation updateLibrary($id: String!, $title: String!){
updateLibrary(input: {
        id: $id
            title: $title
                    })
{
    library {
                              id
                              title
                              books{
                                id
                                title
                              }
}
    errors
}
}`;

export const DELETE_LIBRARY = gql`mutation deleteLibrary($id: String!){
deleteLibrary(input: {
        id: $id
            })
{
    id
    errors
}
}`;
export default LIBRARIES;