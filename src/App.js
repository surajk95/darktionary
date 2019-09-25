import React from 'react';
import './App.scss';

//import Dictionary from './dictionary.json';

class App extends React.Component {
  state = {
    landing: true,
    searchTerm: '',
    result: '',
    resultTitle: '',
    errorMessage: 'Nope, nothing found. Try another word.',
    showError: false,
  }
  componentDidMount() {
    //console.log(Dictionary['DIPLOBLASTIC']);
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });

  }

  handleSearch = (event) => {
  event.preventDefault();
  let searchTerm = this.state.searchTerm.toLowerCase();
  this.setState({ landing: false, resultTitle: searchTerm, result: '' });

  import(`./dictionary/${searchTerm[0]}.json`)
      .then(( Dictionary ) => {
        let result = Dictionary.default[searchTerm];
        if(typeof result === 'undefined'){
          this.setState({ showError: true });
        }
        else {
          this.setState({ resultTitle: searchTerm, result, showError: false });
        } 
      })
      .catch(err => {
        // Handle failure
        console.log(`error`, err);
        this.setState({ showError: true })
      });
}

  render() {
    return (
      <div className="App">
          <form onSubmit={this.handleSearch}>
            <div className={this.state.landing ? "searchForm landing" : "searchForm"} >
              <input
                className="searchInput"
                type="text"
                placeholder="Search here"
                onChange={event=>{this.handleChange(event)}}
                value={this.state.searchTerm}
              ></input>
              <button className="searchButton" type="submit" onClick={this.handlesearch}>
                <img className="searchIcon" alt="search-icon" src="https://icon-library.net/images/white-search-icon-transparent-background/white-search-icon-transparent-background-1.jpg" />
              </button>
            </div>
          </form>
          {
           (this.state.result) &&
            <div className="searchResults">
                <div className="resultTitle">
                  {this.state.resultTitle}
                </div>
                <div className="titleUnderline">
                </div>
                <div className="searchContent">
                  {this.state.result}
                </div>
            </div>
          }
          {
            (this.state.showError) &&
            <div className="errorMessage">
              {this.state.errorMessage}
            </div>
          }
      </div>
    );
  }
}

export default App;
