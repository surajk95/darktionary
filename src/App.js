import React from 'react';
import './App.css';

//import Dictionary from './dictionary.json';

class App extends React.Component {
  state = {
    searchTerm: '',
    result: '',
  }
  componentDidMount() {
    //console.log(Dictionary['DIPLOBLASTIC']);
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });

  }

  handleSearch = (event) => {
  event.preventDefault();
  let searchTerm = this.state.searchTerm;
  //const Dictionary =  import(`./dictionary/${searchTerm[0].toLowerCase()}.json`);

  import(`./dictionary/${searchTerm[0].toLowerCase()}.json`)
      .then(( Dictionary ) => {
        // Use dictionary
        console.log(Dictionary.default[searchTerm]);
        this.setState({ result: Dictionary.default[searchTerm] });
      })
      .catch(err => {
        // Handle failure
        console.log(`error`, err);
      });
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
        <>
          {
            (this.state.result !== '') &&
            this.state.result
          }
        </>
      </div>
    );
  }
}

export default App;
