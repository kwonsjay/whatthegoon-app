import React, { useState } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Columns, Box, Form } from 'react-bulma-components/dist';
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <Columns className="Login">
      <Columns.Column size={4} offset={4}>
        <Box>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Control>
              <Form.Input name="email" value={fields.email} onChange={handleFieldChange} type="email" autoFocus />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Control>
              <Form.Input name="password" value={fields.password} onChange={handleFieldChange} type="password" />
            </Form.Control>
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button loading={isLoading} disabled={!validateForm()} onClick={handleSubmit}>Login</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Columns.Column>
    </Columns>
  );
}
