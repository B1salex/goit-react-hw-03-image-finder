import React, { Component } from "react";


export default class Searchbar extends Component {
    state = {
        imgName: ''
    }

    handleChangeName = e => {
        this.setState({ imgName: e.currentTarget.value.toLowerCase() })
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.imgName);
        this.setState({ imgName: '' })
    
    };


    render() { 
        return (
            <header className="Searchbar">
                <form
                    className='SearchForm'
                    onSubmit={this.handleSubmit}>
                  <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                  </button>


                    <input
                        className='SearchForm-input'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChangeName}
                        value={this.state.imgName}
                    />
                </form>
            </header>
        );
    }
        
}