import React from 'react';
import './App.scss';
import SearchIcon from './search-icon.png';

import Definitions from './components/definitions.jsx';
import Synonyms from './components/synonyms.jsx';
import Antonyms from './components/antonyms.jsx';

class App extends React.Component {
  state = {
    landing: true,
    searchTerm: '',
    result: {},
    resultTitle: '',
    errorMessage: 'Nope, nothing found. Try another word.',
    showError: false,
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });

  }

  isPartofSpeech = (word) => {
    let partsOfSpeech = [
      "noun",
      "verb",
      "adjective",
    ];
    if(partsOfSpeech.indexOf(word.toLowerCase()) > -1)
      return 'wordType'
    else
      return 'wordDefinition'
  }

  handleSearch = (event) => {
    if(event)
      event.preventDefault();
    let searchTerm = this.state.searchTerm.toUpperCase();
    this.setState({ landing: false, resultTitle: searchTerm, result: {} });

    import(`./dictionary/D${searchTerm[0]}.json`)
        .then(( Dictionary ) => {
          let result = Dictionary.default[searchTerm];
          if(typeof result === 'undefined'){
            this.setState({ showError: true });
          }
          else {
            //console.log(result);
            this.setState({ resultTitle: searchTerm, result, showError: false, searchTerm: '' });
          } 
        })
        .catch(err => {
          // Handle failure
          //console.log(`error`, err);
          this.setState({ showError: true })
        });
  }

  searchForWord = (word) => {
    this.setState({ searchTerm: word }, ()=>{
      this.handleSearch();
    })
  }

  render() {
    return (
      <div className="App">
          <div className="logoContainer">
            <a href="https://github.com/surajk95/darktionary" target="_blank" rel="noopener noreferrer">
              Darktionary
            </a>
          </div>
          <form onSubmit={this.handleSearch}>
            <div className={this.state.landing ? "searchForm landing" : "searchForm"} >
              <input
                className="searchInput"
                type="text"
                placeholder="Search here"
                onChange={event=>{this.handleChange(event)}}
                value={this.state.searchTerm}
                autoFocus
              ></input>
              <button className="searchButton" type="submit" onClick={this.handlesearch}>
                <img className="searchIcon" alt="search-icon" src={SearchIcon} />
              </button>
            </div>
          </form>
          {
           (typeof this.state.result === 'object' && Object.keys(this.state.result).length !== 0) &&
            <div className="searchResults">
                <div className="resultTitle">
                  {this.state.resultTitle}
                </div>
                <div className="titleUnderline">
                </div>
                <div className="searchContent">
                {
                  (this.state.result.SYNONYMS && this.state.result.SYNONYMS.length>0) &&
                  <Synonyms
                    synonyms={this.state.result.SYNONYMS}
                    searchForWord={this.searchForWord}
                  />
                }
                {
                  (this.state.result.ANTONYMS && this.state.result.ANTONYMS.length>0) &&
                  <Antonyms
                    antonyms={this.state.result.ANTONYMS}
                    searchForWord={this.searchForWord}
                  />
                }
                {
                  (this.state.result.MEANINGS && Object.values(this.state.result.MEANINGS) && Object.values(this.state.result.MEANINGS).length>0) &&
                  <Definitions
                    meanings={this.state.result.MEANINGS}
                    isPartofSpeech={this.isPartofSpeech}
                  />
                }
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
