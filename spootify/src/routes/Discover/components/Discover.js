import React, {Component} from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  // COULD MOVE AND MAKE ITS OWN COMPONENT BUT AS ONLY USED IN ONE FILE WILL LEAVE HERE
   ApiRequest = (endpoint) => {
    const key = process.env.REACT_APP_SPOTIFY_AUTH;
    return fetch(`https://api.spotify.com/v1/browse/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`
      }
    })
        .then(response => response.json())
  }

  fetchNewReleases = () => {
    console.log(process.env)
    this.ApiRequest('new-releases').then((res) => {
      console.log(res);
      if (res.albums) {
        this.setState({newReleases: res.albums.items});
      }
    })
  }

  fetchPlaylists = () => {
    this.ApiRequest('featured-playlists').then((res) => {
      console.log(res);
      if (res.playlists) {
        this.setState({playlists: res.playlists.items});
      }
    })
  }

  fetchCategories = () => {
    this.ApiRequest('categories').then((res) => {
      console.log(res);
      if (res.categories) {
        this.setState({categories: res.categories.items});
      }
    })
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchNewReleases();
    this.fetchPlaylists();
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
