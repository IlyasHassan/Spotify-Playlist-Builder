import React, {Component, useEffect} from "react";
import Navbar from "./NavBarApp"
import {BrowserRouter} from "react-router-dom"
import Dropdown from "./Dropdown"
import axios from 'axios';
import {Credentials} from './Credentials'
import { useState } from "react";
import Listbox from './Listbox';
import ListboxRecs from './ListboxRecs'
import Slider from '@material-ui/core/Slider';
import { Container } from '@mui/material';
import NavBar from "./NavBar"
import { Typography } from '@mui/material';

//get list of songs from a playlist (50 songs), filter using the user's requirements, 
//then output the first 10 songs, allow refresh which takes the next ten

function App() {

  const spotify = Credentials();  

  console.log('RENDERING APP.JS');

  const data = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'},
  ]; 

  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [recommendations, setRecommendations] = useState({selectedRecommendations: '', listOfRecommendationsFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('	https://api.spotify.com/v1/browse/categories?country=US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })
      axios(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=country&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + tokenResponse.data.access_token
      }
    })
    .then (recommendationsResponse => {
        setRecommendations({
          selectedRecommendations: recommendations.selectedRecommendations,
          listOfRecommendationsFromAPI: recommendationsResponse.data.tracks

        })
      })
      
    });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
  

  console.log(recommendations.listOfRecommendationsFromAPI);

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    });

    console.log(val);
  }

  const playlistChanged = val => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });
  }


  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })
    });
  }
/*
  const danceabilityChanged = val => {

    setDanceability({
      selectedDanceability: val,
      listOfTracksFromAPI: danceabilityResonse.data.items
    })

    axios(`https://api.spotify.com/v1/recommendations`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      body: {
        'target_danceability': danceability
      },
    })
    .then(danceabilityResonse => {
      setDanceability({
        selectedDanceability: tracks.selectedDanceability,
        listOfTracksFromAPI: danceabilityResonse.data.items
      })
    });
    console.log(val);
  }
*/
  const listboxClicked = val => {
/*
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
*/


  }




  return (
<div className="container">
    <NavBar></NavBar>
    <Container className= "containGen" maxWidth="md">


      <form onSubmit={buttonClicked}>   
      <br></br>     
          <Dropdown label="Genre :&nbsp;" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
          <br></br>
          <Dropdown label="Playlist :&nbsp;" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          
          <br></br>
          <div id="centerItem" className="col-sm-6 row form-group px-0">
            <button type='submit' className="btn btn-success col-sm-12">
              Search
            </button>
          </div>
          <br></br>
          <div className="row">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          </div>
          <br></br>

          <div class="slidecontainer">

          <Typography align='center' variant="h4" gutterBottom component="div" >
                    Danceability
                </Typography> 

            <Slider
              className="sliderDet"
              //onChangeCommitted={danceabilityChanged}
              defaultValue={0.5}
              aria-labelledby="discrete-slider-always"
              step={0.1}
              max={1}
              color="primary"
              valueLabelDisplay="on"
            />


<br></br>
<br></br>
<br></br>

            <Typography align='center' variant="h4" gutterBottom component="div">
                    Stat
                </Typography> 

            <Slider
              className="sliderDet"
              defaultValue={80}
              aria-labelledby="discrete-slider-always"
              step={10}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>

            <Typography align='center' variant="h4" gutterBottom component="div">
                    Stat
                </Typography> 

            <Slider
              className="sliderDet"
              defaultValue={80}
              aria-labelledby="discrete-slider-always"
              step={10}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>

            <Typography align='center' variant="h4" gutterBottom component="div">
                    Stat
                </Typography> 


            <Slider
              className="sliderDet"
              defaultValue={80}
              aria-labelledby="discrete-slider-always"
              step={10}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>

            <Typography align='center' variant="h4" gutterBottom component="div">
                    Stat
                </Typography>  

            <Slider
              className="sliderDet"
              defaultValue={80}
              aria-labelledby="discrete-slider-always"
              step={10}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>

          </div>

          <div className="row">
            <ListboxRecs items={recommendations.listOfRecommendationsFromAPI} clicked={listboxClicked} />
          </div>
          <br></br>
<br></br>
<br></br>
            
                 
      </form>
    
    </Container>
    </div>
  );
}

export default App;
