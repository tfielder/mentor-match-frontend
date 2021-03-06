import React, { Component } from 'react';
import Preferences from '../../containers/Preferences';
import hollowHeart from '../../utils/assets/heart.svg';
import solidHeart from '../../utils/assets/solid-heart.svg';
import { connect } from 'react-redux';
import { setLocale, setSearch, toggleShowingMentors } from '../../actions/search-actions';
import './Search.css';

export class Search extends Component {
  constructor() {
    super();

    this.state = {
      localeSelected: '',
      search: '',
      favClicked: false,
      allMentorsClicked: false,
      preferencesClicked: false
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const { setLocale, setSearch } = this.props; 
    
    this.setState({ [name]: value })

    if(name === 'localeSelected') {
      setLocale(value)
    } else if (name === 'search') {
      setSearch(value)
    }
  }

  toggleClicked = async (event) => {
    const { name } = event.target;
    await this.setState({ [name]: !this.state[name] })

    if (name === 'allMentorsClicked') {
      this.props.toggleShowingMentors(!this.props.showingAllMentors)
    }
  }

  render() {
    const {search, localeSelected, preferencesClicked, allMentorsClicked, favClicked } = this.state;

    return (
      <div className='s-search-container'>
        <div className='s-search-and-pref-container'>
          <div className='s-search-and-buttons'>
            <div className='s-search-inputs-container'>
              <div className='s-search-bar'>
                <input 
                  name='search' 
                  type='text' 
                  value={search} 
                  onChange={this.handleChange} 
                  placeholder='Search here...'
                  className='s-search-input'
                />
                <div className='s-search-icon'>
                </div>
              </div>
              <select
                value={localeSelected}
                onChange={this.handleChange}
                name='localeSelected'
                className='s-location-dropdown'
              >
                <option value=''>--Select locale--</option>
                <option value='Denver'>Denver</option>
                <option value='Remote'>Remote</option>
              </select>
            </div>
            <div className='s-filter-btn-container'>
              <button 
                className={!preferencesClicked ? 's-filter-btn' : 's-filter-btn active'}
                onClick={this.toggleClicked}
                name='preferencesClicked'
              >
                Filter by Preferences
              </button>
              <button 
                className={!allMentorsClicked ? 's-filter-btn' : 's-filter-btn active'}
                onClick={this.toggleClicked}
                name='allMentorsClicked'
              >
                All Mentors
              </button>
              <img
                  src={!favClicked ? hollowHeart : solidHeart}
                  alt='favorite button'
                  className={!favClicked ? 's-favorite-btn' : 's-favorite-btn selected'}
                  onClick={this.toggleClicked}
                  name='favClicked'
                />
            </div>
          </div>
          <Preferences preferencesClicked={preferencesClicked}/>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  locale: state.locale,
  showingAllMentors: state.showingAllMentors,
  searchTerm: state.searchTerm
})

export const mapDispatchToProps = (dispatch) => ({
  setLocale: locale => dispatch(setLocale(locale)),
  setSearch: searchTerm => dispatch(setSearch(searchTerm)),
  toggleShowingMentors: (bool) => dispatch(toggleShowingMentors(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);