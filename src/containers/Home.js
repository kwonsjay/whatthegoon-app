import React, { useState, useEffect } from "react";
// import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Section, Hero, Container, Heading, Columns, Card, Content, Progress, Media, Footer, Image } from 'react-bulma-components/dist';
import { API } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  async function onLoad() {
	    if (!props.isAuthenticated) {
	      return;
	    }

	    try {
	      const posts = await loadPosts();
	      setPosts(posts);
	    } catch (e) {
	      alert(e);
	    }

	    setIsLoading(false);
	  }

	  onLoad();
	}, [props.isAuthenticated]);

	function loadPosts() {
	  return API.get("posts", "/posts");
	}

	function renderPostsList(posts) {
	  return [{}].concat(posts).map((post, i) =>
	    i !== 0 ? (
	    	<Columns.Column size={4} key={post.postId}>
	    		<Card>
	    			<Card.Header>
	    				<Card.Header.Title>
	    					{"Created: " + new Date(post.createdAt).toLocaleString()}
	    				</Card.Header.Title>
	    			</Card.Header>
    				<Card.Content>
    					<Content>{post.content.trim().split("\n")[0]}</Content>
    				</Card.Content>
    				<Card.Footer>
    					<Card.Footer.Item renderAs="a" href={`/posts/${post.postId}`}>
    						Edit
    					</Card.Footer.Item>
    				</Card.Footer>
	      	</Card>
	      </Columns.Column>
	    ) : (
	    	<Columns.Column size={3} key="new">
	    		<Card>
	    			<Card.Header>
	    				<Card.Header.Title>Create a new post</Card.Header.Title>
	    			</Card.Header>
    				<Card.Content>
    					<Content renderAs="a" href="/posts/new" className="has-text-centered">
    						<Heading>{"\uFF0B"}</Heading>
    					</Content>
    				</Card.Content>
	      	</Card>
	      </Columns.Column>
	    )
	  );
	}

  function renderLander() {
    return (
    	<>
    	<Hero color="primary" size="medium" gradient>
    		<Hero.Body>
    			<Container>
		        <Heading spaced>Welcome to WhatTheGoon</Heading>
		        <Heading subtitle>So you've lived most of your life abroad when you face the inevitable: <b>mandatory national service</b>.
		        <br />This resource was created for us, by us.
		        <br />You will survive, as we have.</Heading>
	        </Container>
        </Hero.Body>
      </Hero>
      <Section>
      	<Container>
      		<Columns>
      			<Columns.Column size={4}>
      				<Card className="is-fullheight">
			    			<Card.Header>
			    				<Card.Header.Title>Track Your Progress</Card.Header.Title>
			    			</Card.Header>
		    				<Card.Content>
		    					<Content>
		    						<Heading size={4} className="custom-narrow">Start Date</Heading>
		    						<p>July 11, 2016</p>
		    						<Heading size={4} className="custom-narrow">Road To Emancipation</Heading>
		    						<Progress max={100} value={15} color="info" />
		    					</Content>
		    				</Card.Content>
      				</Card>
      			</Columns.Column>
      			<Columns.Column size={4}>
      				<Card className="is-fullheight">
			    			<Card.Header>
			    				<Card.Header.Title>Share Experiences</Card.Header.Title>
			    			</Card.Header>
		    				<Card.Content>
		    					<Content>
		    						<p>Q: How do you go about getting the military office to recognize a foreign university degree?</p>
		    						<p>A: I had to get mine notarized by the state and mailed to Korea with an official seal.</p>
		    					</Content>
		    				</Card.Content>
      				</Card>
      			</Columns.Column>
      			<Columns.Column size={4}>
      				<Card className="is-fullheight">
			    			<Card.Header>
			    				<Card.Header.Title>Build A Network</Card.Header.Title>
			    			</Card.Header>
		    				<Card.Content>
		    					<Content>
		    						<Heading size={4}>Seoul meetup next week!</Heading>
		    						<Heading subtitle size={6}>Your time here should be worthwhile.</Heading>
		    					</Content>
		    				</Card.Content>
      				</Card>
      			</Columns.Column>
      		</Columns>
      	</Container>
      </Section>
      <Section>
      	<Container>
	      	<Heading>Who Are We?</Heading>
	      	<Heading subtitle>Just two dudes who were just recently in your shoes.</Heading>
      		<Columns>
      			<Columns.Column size={6}>
      				<Card>
      					<Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />
		    				<Card.Content>
		    					<Media>
		    						<Media.Item renderAs="figure" position="left">
		    							<Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
		    						</Media.Item>
		    						<Media.Item>
		    							<Heading size={4}>Herp</Heading>
		    							<Heading subtitle size={6}>@herpetology</Heading>
		    						</Media.Item>
		    					</Media>
		    					<Content>
	                  I served as a military research agent.<br />
	                  <time dateTime="2016-7-11">11 July 2016</time> ~ <time dateTime="2019-7-10">10 July 2019</time>
		    					</Content>
		    				</Card.Content>
      				</Card>
      			</Columns.Column>
      			<Columns.Column size={6}>
      				<Card>
      					<Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />
		    				<Card.Content>
		    					<Media>
		    						<Media.Item renderAs="figure" position="left">
		    							<Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
		    						</Media.Item>
		    						<Media.Item>
		    							<Heading size={4}>Derp</Heading>
		    							<Heading subtitle size={6}>@derpetology</Heading>
		    						</Media.Item>
		    					</Media>
		    					<Content>
	                  I also served as a military research agent.<br />
	                  <time dateTime="2016-9-7">7 Sep 2016</time> ~ <time dateTime="2019-9-6">6 Sep 2019</time>
		    					</Content>
		    				</Card.Content>
      				</Card>
      			</Columns.Column>
      		</Columns>
      	</Container>
      </Section>
      <Footer>
      	<Container>
      		<Content style={{ textAlign: 'center' }}>
      			<Heading>This is still a work in progress.</Heading>
      			<strong>2019 WhatTheGoon</strong>
      		</Content>
      	</Container>
      </Footer>
      </>
    );
  }

  function renderPosts() {
    return (
      <Section className="posts">
        <Heading>Your Posts</Heading>
        <Columns>
          {!isLoading && renderPostsList(posts)}
        </Columns>
      </Section>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderPosts() : renderLander()}
    </div>
  );
}