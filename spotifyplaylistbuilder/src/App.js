import React, {Component, useEffect} from "react";
import Navbar from "./NavBarApp"
import {BrowserRouter} from "react-router-dom"
import Dropdown from "./Dropdown"
import DropdownSeedGenres from "./DropdownSeedGenres"
import axios from 'axios';
import {Credentials} from './Credentials'
import { useState } from "react";
import Listbox from './Listbox';
import ListboxRecs from './ListboxRecs'
import Slider from '@material-ui/core/Slider';
import { Container } from '@mui/material';
import NavBar from "./NavBar"
import { Typography, Grid } from '@mui/material';
import Detail2 from "./Detail2"
//get list of songs from a playlist (50 songs), filter using the user's requirements, 
//then output the first 10 songs, allow refresh which takes the next ten

function App() {

  const spotify = Credentials();  

  console.log('RENDERING APP.JS');


  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [seedgenres, setSeedGenres] = useState({selectedSeedGenre: '', listOfSeedGenresFromAPI: []});
  const [recommendations, setRecommendations] = useState({selectedRecommendations: '', listOfRecommendationsFromAPI: []});
  const [minenergy, setMinEnergy] = useState({selectedMinEnergy: 0, newMinEnergy: 0});
  const [minpopularity, setMinPopularity] = useState({selectedMinPopularity: 0, newMinPopularity: 0});
  const [acoustic, setAcoustic] = useState({selectedAcoustic: 0, newAcoustic: 0});
  const [danceable, setDanceable] = useState({selectedDanceable: 0, newDanceable: 0});
  const [tempo, setTempo] = useState({selectedTempo: 0, newTempo: 0});


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

      axios('https://api.spotify.com/v1/browse/categories?country=US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })

      axios('https://api.spotify.com/v1/recommendations/available-genre-seeds?country=US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (seedgenreResponse => {        
        setSeedGenres({
          selectedSeedGenre: seedgenres.selectedSeedGenre,
          listOfSeedGenresFromAPI: seedgenreResponse.data.genres
        })
      })
      
    });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
  

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?market=US?limit=10`, {
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

  const seedGenreChanged = val => {
    setSeedGenres({
      selectedSeedGenre: val, 
      listOfSeedGenresFromAPI: seedgenres.listOfSeedGenresFromAPI
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

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?market=US&limit=10`, {
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

  const handleChange = (event, newValue) => {
    event.preventDefault();

    setMinEnergy({
      selectedMinEnergy: minenergy.selectedMinEnergy,
      newMinEnergy: newValue
    })

  }

  const handleChange2 = (event, newValue) => {
    event.preventDefault();

    setMinPopularity({
      selectedMinPopularity: minpopularity.selectedMinPopularity,
      newMinPopularity: newValue
    })

  }

  const handleChange3 = (event, newValue) => {
    event.preventDefault();

    setAcoustic({
      selectedAcoustic: acoustic.selectedAcoustic,
      newAcoustic: newValue
    })

  }

  const handleChange4 = (event, newValue) => {
    event.preventDefault();

    setDanceable({
      selectedDanceable: danceable.selectedDanceable,
      newDanceable: newValue
    })

  }

  const handleChange5 = (event, newValue) => {
    event.preventDefault();

    setTempo({
      selectedTempo: tempo.selectedTempo,
      newTempo: newValue
    })

  }

  const buttonTwoClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/recommendations?market=US&target_danceability=${danceable.newDanceable}&target_tempo=${tempo.newTempo}&seed_genres=${seedgenres.selectedSeedGenre}&target_acousticness=${acoustic.newAcoustic}&target_energy=${minenergy.newMinEnergy}&target_popularity=${minpopularity.newMinPopularity}`, {
    method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then (recommendationsResponse => {
        setRecommendations({
          selectedRecommendations: recommendations.selectedRecommendations,
          listOfRecommendationsFromAPI: recommendationsResponse.data.tracks

        })
      })
  }

  const refreshTracks = () => {

    const finalArray = tracks.listOfTracksFromAPI.sort(() => Math.random() - Math.random()).slice(0, 10);


    setTracks({
      selectedTrack: tracks.selectedTrack,
      listOfTracksFromAPI: finalArray
    }) 
    console.log(finalArray)


  }

  return (
<div className="container">
    <NavBar></NavBar>
    <br></br>
    <Container className= "containGen" maxWidth="md">
    <br></br>
<br></br>
<br></br>
    <Typography align='center' variant="h2" gutterBottom component="div" >
                    Tracks From Curated Spotify Playlists
                </Typography> 


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
            <button  type='button' onClick={refreshTracks}>
              Refresh
            </button>
          </div>
          <br></br>
          <Grid class="gridxs"container spacing={2} columns={2}>
            <Grid class="gridxs1"item lg>
              <Listbox items={tracks.listOfTracksFromAPI} />
            </Grid>
            <Grid class="gridxs1"item lg>
              <Detail2 items={tracks.listOfTracksFromAPI}></Detail2>
            </Grid>
          </Grid>
      
          </form>
          <br></br>
          <br></br>
<br></br>
<br></br>
          <div class="slidecontainer">
            <form onSubmit={buttonTwoClicked}>

          <Typography align='center' variant="h2" gutterBottom component="div" >
                    Recommended Tracks Based on Your Favorite Genres and Other Stats
                </Typography> 
                <br></br>
<br></br>
<br></br>

<DropdownSeedGenres label="Genre :&nbsp;" options={seedgenres.listOfSeedGenresFromAPI} selectedValue={seedgenres.selectedSeedGenre} changed={seedGenreChanged} />
          <br></br>
          <br></br>
          <br></br>
          <Typography align='center' variant="h4" gutterBottom component="div" >
                    Energy
                </Typography> 

            <Slider
              className="sliderDet"
              onChange={handleChange}
              defaultValue={0}
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
                    Popularity
                </Typography> 

            <Slider
              className="sliderDet"
              onChange={handleChange2}
              defaultValue={0}
              aria-labelledby="discrete-slider-always"
              step={10}
              max={100}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>

            <Typography align='center' variant="h4" gutterBottom component="div">
                    Acousticness
                </Typography> 

            <Slider
              className="sliderDet"
              onChange={handleChange3}
              defaultValue={0}
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
                    Danceability
                </Typography> 


            <Slider
              className="sliderDet"
              onChange={handleChange4}
              defaultValue={0}
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
                    Tempo
                </Typography>  

            <Slider
              className="sliderDet"
              onChange={handleChange5}
              defaultValue={50}
              aria-labelledby="discrete-slider-always"
              step={10}
              max={200}
              min={50}
              color="primary"
              valueLabelDisplay="on"
            />

<br></br>
<br></br>
<br></br>
<button type='submit' className="btn btn-success col-sm-12">
              Generate
            </button>
          </form>
          <br></br>
          <br></br>
          <br></br>
          </div>

          <div className="row">
            <ListboxRecs items={recommendations.listOfRecommendationsFromAPI}  />
          </div>
          <br></br>
<br></br>
<br></br>
            
                 
      
    
    </Container>
    </div>
  );
}

export default App;
