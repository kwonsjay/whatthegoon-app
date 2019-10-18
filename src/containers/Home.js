import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
	      <LinkContainer key={post.postId} to={`/posts/${post.postId}`}>
	        <ListGroupItem header={post.content.trim().split("\n")[0]}>
	          {"Created: " + new Date(post.createdAt).toLocaleString()}
	        </ListGroupItem>
	      </LinkContainer>
	    ) : (
	      <LinkContainer key="new" to="/posts/new">
	        <ListGroupItem>
	          <h4>
	            <b>{"\uFF0B"}</b> Create a new post
	          </h4>
	        </ListGroupItem>
	      </LinkContainer>
	    )
	  );
	}

  function renderLander() {
    return (
      <div className="lander">
        <h1>WhatTheGoon</h1>
        <p>A Guide to the Korean Mandatory Draft for Third-Culture Kids</p>
      </div>
    );
  }

  function renderPosts() {
    return (
      <div className="posts">
        <PageHeader>Your Posts</PageHeader>
        <ListGroup>
          {!isLoading && renderPostsList(posts)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderPosts() : renderLander()}
    </div>
  );
}