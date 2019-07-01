import React, { useState, useEffect, } from 'react';
import axios from "axios";
import { Grid, Container, Input, Header, Button, } from "semantic-ui-react";
import Tweets from "./Tweets";

function App() {
  const [tweets, setTweets] = useState([]);
  const [visible, setVisible] = useState([]);
  const [search, setSearch] = useState("");
  const [tweet, setTweet] = useState("");

  useEffect( () => {
    axios.get("/api/tweets")
      .then( res => {
        setTweets(res.data);
        setVisible(res.data);
      })
  }, []);

  useEffect( () => {
    updateVisible();
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);    
  };

  const updateVisible = () => {
    if (search.length === 0)
      setVisible(tweets);
    else if (search.length > 3) {
      axios.get(`/api/search?term=${search}`)
        .then( res => setVisible(res.data) )
    };
  };

  const postTweet = () => {
    if (tweet) {
      axios.post("/api/tweet", { tweet })
        .then( res => {
          setTweet("");
          setVisible([ ...visible, res.data, ]);
        })
    };
  };

  return (
    <Container>
      <Grid>
        <Grid.Row mobile={16} tablet={16} computer={4}>
          <Header as="h2" textAlign="center">Search</Header>
          <Input 
            value={search}
            onChange={handleChange}
            icon={{ name: "search", circular: true, }}
            placeholder="Search..."
          />
          <hr />
          <Header as="h2" textAlign="center">Tweet Something</Header>
          <Input onChange={(e) => setTweet(e.target.value)} value={tweet} />
          <Button onClick={postTweet}>Tweet!</Button>
        </Grid.Row>
        <Grid.Row mobile={16} tablet={16} computer={10}> 
          <Tweets tweets={visible} />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default App;


