import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import NewBook from './NewBook';
import BOOKS from './../queries/books_query';
import BookElement from "./BookElement";
import LibraryList from "./Libraries";
import NewLibrary from "./NewLibrary";
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";


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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    display: 'inline-block',
    margin: '15px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const bookList = (
  <div>
  <Query query={BOOKS}>
    {({ loading, error, data }) => {
      const classes = useStyles();
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error! ${error.message} </div>
      return (
        <div className="flex flex-wrap mb-4">
        Books:
          <p></p>
        {data.allBooks.map((book) => {
                    console.log(book.author.name)
                    return <Card className={classes.root}>
                      <CardContent>
                      <BookElement book_id={book.id} title={book.title} genre={book.genre} author={book.author.name} />
                        </CardContent>
                     <p></p>
                    </Card>
                  })}
          <Card className={classes.root}>
            <CardContent>
                  <div className="add-book">
                    <NewBook />
                  </div>
              </CardContent>

          </Card>
                  <LibraryList />
                  <NewLibrary />
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
