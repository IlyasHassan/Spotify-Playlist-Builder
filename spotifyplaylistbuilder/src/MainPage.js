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
import Detail3 from "./Detail3"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//get list of songs from a playlist (50 songs), filter using the user's requirements,
//then output the first 10 songs, allow refresh which takes the next ten

function MainPage() {

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
  const [playlistName, setPlaylistName] = useState("");
  const [userId, setUserId] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return paramsSplitUp;
  };

  useEffect(() => {

    if (window.location.hash) {
        const { access_token, expires_in, token_type } =
          getReturnedParamsFromSpotifyAuth(window.location.hash);

        localStorage.clear();

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
      }


      /*
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
*/
      axios('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")}
      })
      .then (genreResponse => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      })

        console.log("listofgenres");
        console.log(genres.listOfGenresFromAPI);



      axios('https://api.spotify.com/v1/recommendations/available-genre-seeds?', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")}
      })
      .then (seedgenreResponse => {
        setSeedGenres({
          selectedSeedGenre: seedgenres.selectedSeedGenre,
          listOfSeedGenresFromAPI: seedgenreResponse.data.genres
        })
      })
    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);




  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")}
        })
          .then(playlistResponse => {
            setPlaylist({
              selectedPlaylist: playlist.selectedPlaylist,
              listOfPlaylistFromAPI: playlistResponse.data.playlists.items
            })
          });

    console.log("listofplaylists");
    console.log(playlist.listOfPlaylistFromAPI);


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

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?market=US`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items.slice(0, 10)
      })
    });
  }

  const handleChange = (event, newValue) => {
    event.preventDefault();

    setMinEnergy({
      selectedMinEnergy: minenergy.selectedMinEnergy,
      newMinEnergy: newValue
    })

    getEnergy();


  }

  const getEnergy = (Value, Stat) => {
    if(Value < 0.4){
      return(

      <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
                    Low {Stat}
                </Typography>

      )}
    if(0.4 <= Value && Value <= 0.7){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
                    Medium {Stat}
                </Typography>
      )}
    if(Value > 0.7){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
                    High {Stat}
                </Typography>
      )}

    else{
      return(
      <p></p>
      )}

  }

  const getPopularity = () => {
    if(minpopularity.newMinPopularity < 40){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Low Popularity
    </Typography>

      )}
    if(40 <= minpopularity.newMinPopularity && minpopularity.newMinPopularity <= 70){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Medium Popularity
    </Typography>
      )}
    if(minpopularity.newMinPopularity > 70){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        High Popularity
    </Typography>
      )}

    else{
      return(
      <p></p>
      )}

  }

  const getBPM = () => {


    if(50 <= tempo.newTempo && tempo.newTempo <= 80){
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Low Speed
    </Typography>

      )}
    if(90 <= tempo.newTempo && tempo.newTempo <= 130){
      return(

        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Medium Speed
    </Typography>
      )}
    if(140 <= tempo.newTempo && tempo.newTempo <= 180){
      return(

        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        High Speed
    </Typography>
      )}

    if(190 <= tempo.newTempo && tempo.newTempo <= 200){
      return(

        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Very High Speed
    </Typography>
      )}

    else{
      return(
        <Typography align='center' color='primary' variant="h7" gutterBottom component="div">
        Low Speed
    </Typography>
      )}

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

    axios(`https://api.spotify.com/v1/recommendations?market=US&limit=10&target_danceability=${danceable.newDanceable}&target_tempo=${tempo.newTempo}&seed_genres=${seedgenres.selectedSeedGenre}&target_acousticness=${acoustic.newAcoustic}&target_energy=${minenergy.newMinEnergy}&target_popularity=${minpopularity.newMinPopularity}`, {
    method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
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


    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?market=US`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items.sort(() => Math.random() - Math.random()).slice(0, 10)
      })
    });

  }

  const createPlaylist = (e) => {

    e.preventDefault();

    console.log(recommendations.listOfRecommendationsFromAPI[0].uri)
    const uri_list = [];

    for(var i=0; i<recommendations.listOfRecommendationsFromAPI.length; i++){
        uri_list.push(recommendations.listOfRecommendationsFromAPI[i].uri);
    }

    //const uri_list = recommendations.listOfRecommendationsFromAPI.map((item) => item[0].uri);






    axios(`https://api.spotify.com/v1/users/224kggdxqcgsjbw7lyxjd4pty/playlists`, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
      },
      data: {
        "name": `${playlistName}`,
        "description": "",
        "public": true
      },
      method: 'POST'
    })
    .then( playlistResponse => {
        //console.log(playlistResponse);
        setPlaylistId(playlistResponse.data.id)

    });
    console.log(playlistId)
    axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?`, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
      },
      data: {
        "uris": uri_list

      },
      method: 'POST'
    })

    console.log("sent to spotify")
    console.log(uri_list)
    console.log(playlistId)

  }

  return (
<div className="container">

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
            <Button variant="contained" type='submit'>
              Search
            </Button>

            <Button  variant="contained" type='button' onClick={refreshTracks}>
              Refresh
            </Button>
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
<p>{getEnergy(minenergy.newMinEnergy, "Energy")}</p>
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
<p>{getPopularity()}</p>
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
<p>{getEnergy(acoustic.newAcoustic, "Acousticness")}</p>
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
<p>{getEnergy(danceable.newDanceable, "Danceability")}</p>
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
<p>{getBPM()}</p>
<br></br>
<br></br>
<br></br>
<div id="centerItem">
<Button  variant="contained" type='submit'>
              Generate
            </Button>
            </div>
          </form>
          <br></br>
          <br></br>
          <br></br>
          </div>
          <Grid class="gridxs"container spacing={2} columns={2}>
            <Grid class="gridxs1"item lg>
            <ListboxRecs items={recommendations.listOfRecommendationsFromAPI}  />
            </Grid>
            <Grid class="gridxs1"item lg>
              <Detail3 items={recommendations.listOfRecommendationsFromAPI}></Detail3>
            </Grid>
          </Grid>
          <br></br>
<br></br>
<br></br>
            <form onSubmit={createPlaylist}>

            <TextField
            label="Enter Playlist Name"
            variant="outlined"
            input='text'
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)} />


            <Button type='submit' variant="contained"  >
              Send To Spotify
            </Button>




            </form>



    </Container>
    </div>
  );
}

export default MainPage;
