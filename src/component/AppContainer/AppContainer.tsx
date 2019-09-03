import * as React from "react";

/** Stylesheet Imports */
import "./AppContainer.scss";
// import Navigation from "./Navigation";
import { RouterLink } from "../../types/routerLinkTypes";
import InvestmentPlanner from "./Home";

export interface Props {
    children?: React.ReactNode
    routerLinks: RouterLink[]
}

export interface State {
}

export default class AppContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className='investa-app-container'>
                <InvestmentPlanner />
                {/* <Navigation routerLinks={this.props.routerLinks} /> */}
            </div>
        )
    }
}
