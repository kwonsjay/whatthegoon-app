import React, { useRef, useState } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
// import LoaderButton from "../components/LoaderButton";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Columns, Box, Form, Icon } from 'react-bulma-components/dist';
import config from "../config";
import "./NewPost.css";

export default function NewPost(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
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
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;

      await createPost({ content, attachment });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createPost(post) {
    return API.post("posts", "/posts", {
      body: post
    });
  }

  return (
    <Columns className="NewPost">
      <Columns.Column size={4} offset={4}>
        <Box>
          <Form.Field>
            <Form.Label>Content</Form.Label>
            <Form.Control>
              <Form.Textarea name="content" value={content} onChange={e => setContent(e.target.value)} autoFocus />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Attachment</Form.Label>
            <Form.Control>
              <Form.InputFile name="file" onChange={handleFileChange} type="file" icon={<Icon icon="upload" />} boxed />
            </Form.Control>
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button loading={isLoading} disabled={!validateForm()} onClick={handleSubmit}>Create</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Columns.Column>
    </Columns>
  );
}
