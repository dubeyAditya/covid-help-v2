import * as React from "react";

/** Stylesheet Imports */
import "./InvestmentDetails.scss";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class InvestmentDetails extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }
}
