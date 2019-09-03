import * as React from "react";

/** Stylesheet Imports */
import "./NavigationSegment.scss";
import { Segment } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { RouterLink } from "../../../../types/routerLinkTypes";

interface INavigationSegmentProps {
    routerLinks: RouterLink[]
}

const NavigationSegment: React.FunctionComponent<INavigationSegmentProps> = ({ routerLinks }) => {
    return (<div className='navigation-segment'>
        <Segment>
            {
                routerLinks.map((routerLink: RouterLink) => {
                    const { name, ...routerProps } = routerLink;
                    return <Route {...routerProps} />
                })
            }
        </Segment>
    </div>);
};

export default NavigationSegment;
