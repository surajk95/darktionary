import React from 'react';
import './App.scss';

//import Dictionary from './dictionary.json';

class App extends React.Component {
  state = {
    landing: true,
    searchTerm: '',
    result: {},
    resultTitle: '',
    errorMessage: 'Nope, nothing found. Try another word.',
    showError: false,
  }
  componentDidMount() {
    
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
                autoFocus
              ></input>
              <button className="searchButton" type="submit" onClick={this.handlesearch}>
                <img className="searchIcon" alt="search-icon" src="https://icon-library.net/images/white-search-icon-transparent-background/white-search-icon-transparent-background-1.jpg" />
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
                  <div className="inlineContainer">
                    <span className="inlineHeading"> Synonyms </span>
                      {
                        this.state.result.SYNONYMS.map((item, index) => {
                        return(
                          <span className="inlineItem" key={index}>{item}</span>
                        )
                      })
                      }
                  </div>
                }
                {
                  (this.state.result.ANTONYMS && this.state.result.ANTONYMS.length>0) &&
                  <div className="inlineContainer">
                    <span className="inlineHeading"> Antonyms </span>
                      {
                        this.state.result.ANTONYMS.map((item, index) => {
                        return(
                          <span className="inlineItem" key={index}>{item}</span>
                        )
                      })
                      }
                  </div>
                }
                {
                  (this.state.result.MEANINGS && Object.values(this.state.result.MEANINGS) && Object.values(this.state.result.MEANINGS).length>0) &&
                  <>
                      <span className="definitionHeading"> Definition </span>
                      {
                        Object.values(this.state.result.MEANINGS).map((item, index) => {
                          return(
                            <div key={index}>
                              {
                                item.length>0 &&
                                item.map((deeperItem, deeperIndex) => {
                                  return (
                                    typeof deeperItem === 'string' &&
                                    <span key={deeperIndex} className={this.isPartofSpeech(deeperItem)}> 
                                      {deeperItem}
                                    </span>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                  </>
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
