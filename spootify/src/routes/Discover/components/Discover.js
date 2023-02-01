import React, { useEffect, useState } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import api from '../../../api'

export default function Discover() {
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call multiple APIs in parallel
        const [releasesRes, playlistsRes, categoriesRes] = await Promise.all([
          api.albums.getNewReleases(),
          api.playlists.getFeaturedPlaylists(),
          api.categories.getCategories()
        ]);
  
        setNewReleases(releasesRes || [])
        setPlaylists(playlistsRes || [])
        setCategories(categoriesRes || [])
      } catch (e) {
        console.error(e)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
}
