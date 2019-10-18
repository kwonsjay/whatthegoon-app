import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./Posts.css";

export default function Posts(props) {
  const file = useRef(null);
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingFile, setIsDeletingFile] = useState(false);

  useEffect(() => {
    function loadPost() {
      return API.get("posts", `/posts/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const post = await loadPost();
        const { content, attachment } = post;

        if (attachment) {
          post.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setPost(post);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function savePost(post) {
    return API.put("posts", `/posts/${props.match.params.id}`, {
      body: post
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await savePost({
        content,
        attachment: attachment || post.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deletePost() {
    return API.del("posts", `/posts/${props.match.params.id}`);
  }

  function deleteFile() {
    return Storage.vault.remove(post.attachment);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      if (post.attachment) await deleteFile();
      await deletePost();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  async function handleFileDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeletingFile(true);

    try {
      await deleteFile();
      setPost({
        content: content,
        attachment: ""
      })
      setIsDeletingFile(false);
    } catch (e) {
      alert(e);
      setIsDeletingFile(false);
    }
  }

  return (
    <div className="Posts">
      {post && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {post.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post.attachmentURL}
                >
                  {formatFilename(post.attachment)}
                </a>
                <LoaderButton
                  block
                  bsStyle="danger"
                  onClick={handleFileDelete}
                  isLoading={isDeletingFile}
                >
                  Delete File
                </LoaderButton>
              </FormControl.Static>
            </FormGroup>
          )}
          {!post.attachment && (
            <FormGroup controlId="file">
              <ControlLabel>Attachment</ControlLabel>
              <FormControl onChange={handleFileChange} type="file" />
            </FormGroup>
          )}
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
