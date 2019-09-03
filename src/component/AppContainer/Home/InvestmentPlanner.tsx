import * as React from "react";

/** Stylesheet Imports */
import "./InvestmentPlanner.scss";
import { HomePageLayout } from ".";

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
            <div className='investment-planner'>
                <HomePageLayout />
            </div>
        )
    }
}
