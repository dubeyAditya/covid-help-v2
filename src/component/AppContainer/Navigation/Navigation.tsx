import React from 'react';

/** Stylesheet Imports */
import "./Navigation.scss";

import { NavigationMenu, NavigationSegment } from '.';
import { RouterLink } from '../../../types/routerLinkTypes';

export interface Props {
    children?: React.ReactNode
    routerLinks: RouterLink[]
}

export interface State {
}

export default class Navigation extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { routerLinks } = this.props;
        return (
            <div>
                <NavigationMenu routerLinks={routerLinks}></NavigationMenu>
                <NavigationSegment routerLinks={routerLinks}></NavigationSegment>
            </div>
        )
    }
}
