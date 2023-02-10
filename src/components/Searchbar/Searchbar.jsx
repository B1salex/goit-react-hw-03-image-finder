import PropTypes from 'prop-types';
import { Component } from "react";
import { IoSearchOutline } from 'react-icons/io5';
import { Header, SearchForm, Button, Label, Input, } from './Searchbar.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    findImg: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

handleNameChange = evt => {
  this.setState({findImg: evt.currentTarget.value.toLowerCase() });
};

handleSubmit = evt => {
  evt.preventDefault();

  if (this.state.findImg.trim() === '') {
    return toast.error('Please enter something.');
  }

  this.props.onSubmit(this.state.findImg);
  this.setState({ findImg: '' });
};

render() {
    return (
      <Header>
        <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <IoSearchOutline size={24} />
            <Label>Search</Label>
          </Button>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.findImg}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </Header>
    );
  }};