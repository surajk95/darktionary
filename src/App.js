import React from 'react';
import './App.css';

//import Dictionary from './dictionary.json';

class App extends React.Component {
  state = {
    searchTerm: '',
  }
  componentDidMount() {
    //console.log(Dictionary['DIPLOBLASTIC']);
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });

  }

  handleSearch = async (event) => {
  event.preventDefault();
  let searchTerm = this.state.searchTerm;
  try {
    const Dictionary = await import(`./dictionary/${searchTerm[0].toLowerCase()}.json`);
    console.log(`search term, result`, searchTerm, Dictionary[searchTerm]);
  }
  catch {
    console.log('Error');
  }
}

  render() {
    return (
      <div className="App">
        Darktionary

        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            placeholder="Search here"
            onChange={event=>{this.handleChange(event)}}
            value={this.state.searchTerm}
          ></input>
          <button type="submit" onClick={this.handlesearch}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default App;
