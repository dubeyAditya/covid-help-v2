import * as React from "react";

import { SignIn, SignUp } from "./Login";

/** Stylesheet Imports */
import "./InvestmentPlanner.scss";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class InvestmentPlanner extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div><SignIn /></div>
        )
    }
}
