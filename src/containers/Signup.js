import React, { useState } from "react";
import { Auth } from "aws-amplify";
// import {
//   Modal,
//   HelpBlock,
//   FormGroup,
//   FormControl,
//   ControlLabel
// } from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Columns, Box, Form, Notification } from 'react-bulma-components/dist';
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword &&
      !isConfirmed &&
      !showMessage
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  function handleMessageClose() {
    setShowMessage(false);
  }

  function resetForm() {
    fields.email = "";
    fields.password = "";
    fields.confirmPassword = "";
    setIsConfirmed(false);
    setShowMessage(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if (e.name === 'UsernameExistsException') {
        setShowMessage(true);
      }
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function resendVerification(event) {
    event.preventDefault();
    setIsSending(true);

    try {
      await Auth.resendSignUp(fields.email);
      setIsSending(false);
      setShowMessage(false);
      setBypass(true);
    } catch (e) {
      if (e.name === 'InvalidParameterException') {
        setIsConfirmed(true);
      }
      setIsSending(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Columns.Column size={4} offset={4}>
        <Box>
          <Form.Field>
            <Form.Label>Confirmation Code</Form.Label>
            <Form.Control>
              <Form.Input name="confirmationCode" value={fields.confirmationCode} onChange={handleFieldChange} type="tel" autoFocus />
            </Form.Control>
            <Form.Help>Please check your email for the code.</Form.Help>
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button loading={isLoading} disabled={!validateConfirmationForm()} onClick={handleConfirmationSubmit}>Verify</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Columns.Column>
    );
  }

  function renderForm() {
    return (
      <Columns.Column size={4} offset={4}>
        { showMessage &&
          <Notification color="primary">
            { !isConfirmed ?
              (
                <p>This account already exists!</p>
              ) : (
                <>
                  <p>This account has already been confirmed.</p>
                  <p>Please proceed to log in.</p>
                </>
              )
            }
            <div className="buttons">
              <Button className="is-primary is-inverted is-outlined" loading={isSending} disabled={isConfirmed} onClick={resendVerification}>Resend Verification</Button>
              <Button className="is-primary is-inverted is-outlined" onClick={resetForm}>Reset Form</Button>
            </div>
          </Notification>
        }
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
          <Form.Field>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control>
              <Form.Input name="confirmPassword" value={fields.confirmPassword} onChange={handleFieldChange} type="password" />
            </Form.Control>
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button loading={isLoading} disabled={!validateForm()} onClick={handleSubmit}>Signup</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Columns.Column>
    );
  }

  return (
    <Columns className="Signup">
      {(newUser === null) && !bypass ? renderForm() : renderConfirmationForm()}
    </Columns>
  );
}
