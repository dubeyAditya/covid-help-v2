import * as React from "react";

import { Form, Checkbox, Button } from "semantic-ui-react";

/** Stylesheet Imports */
import "./SignIn.scss";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class SignIn extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}
