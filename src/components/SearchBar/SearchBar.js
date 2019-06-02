import React from 'react';
import './SearchBar.css';


 export default class SearchBar extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       searchInput: ''
     };
     this.handleSearchInput = this.handleSearchInput.bind(this);
     this.handleSearch = this.handleSearch.bind(this);
   }

   handleSearchInput(e){
     this.setState({
       searchInput: e.target.value
     })
   }

   handleSearch(e){
     this.props.searchSpotify(this.state.searchInput);
     e.preventDefault();
   }

   render() {
     return (
     <section className="SearchBar">
        <input placeholder="Enter A Song Title, Album or Artist" onChange={this.handleSearchInput}/>
        <button onClick = {this.handleSearch} className="SearchButton">SEARCH</button>
     </section>
   )
  }
}
