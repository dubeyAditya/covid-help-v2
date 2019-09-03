import * as React from "react";

/** Stylesheet Imports */
import "./Analytics.scss";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class Analytics extends React.Component<Props, State> {

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
