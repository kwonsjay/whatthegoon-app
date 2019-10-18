import React, { useState } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
// import LoaderButton from "./LoaderButton";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Columns, Box, Form } from 'react-bulma-components/dist';
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.storage !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <Columns className="BillingForm">
      <Columns.Column size={4} offset={4}>
        <Box>
          <Form.Field>
            <Form.Label>Storage</Form.Label>
            <Form.Control>
              <Form.Input name="storage" value={fields.storage} onChange={handleFieldChange} placeholder="Posts to purchase" min="0" type="number" />
            </Form.Control>
          </Form.Field>
          <hr />
          <Form.Field>
            <Form.Label>Cardholder&apos;s name</Form.Label>
            <Form.Control>
              <Form.Input name="name" value={fields.name} onChange={handleFieldChange} type="text" placeholder="Name on the card" />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Credit Card Info</Form.Label>
            <CardElement
              className="card-field"
              onChange={e => setIsCardComplete(e.complete)}
              style={{
                base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
              }}
            />
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button loading={isLoading} disabled={!validateForm()} onClick={handleSubmitClick}>Purchase</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Columns.Column>
    </Columns>
  );
}

export default injectStripe(BillingForm);
