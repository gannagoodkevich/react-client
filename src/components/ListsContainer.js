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
import AUTHORS from "../queries/author_query";
import AuthorList from "./Authors";
import CommentList from "./Comments";
import ButtonAppBar from "./NavbarLight";
import {NavbarLight} from "./NavbarLight";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 500,
    minHeight: 350,
    maxHeight: 600,
    display: 'inline-block',
    margin: '15px',
    color: '#282c34',
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
        <div className="app-div">
          {render => {
            return ButtonAppBar()
          }}
                  <LibraryList />
                  <NewLibrary />
                  <AuthorList />
                  <CommentList />
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
