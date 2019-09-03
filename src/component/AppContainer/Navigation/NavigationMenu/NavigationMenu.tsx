import * as React from "react";

/** Stylesheet Imports */
import "./NavigationMenu.scss";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RouterLink } from "../../../../types/routerLinkTypes";

export interface Props {
    children?: React.ReactNode,
    routerLinks: RouterLink[]
}

export interface State {
    activeItem: string;
}

export default class NavigationMenu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            activeItem: 'home'
        }
    }

    handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

    generateMenuLinks = ({ name, path }: RouterLink) => {
        const { activeItem } = this.state;
        const { handleItemClick } = this;
        return (
            <Menu.Item
                name={name}
                active={activeItem === name}
                onClick={handleItemClick}>
                <Link to={path}>
                    {name.toUpperCase()}
                </Link>
            </Menu.Item>
        )
    }

    render() {
        const { routerLinks } = this.props;
        const { generateMenuLinks } = this;
        return (
            <div className='navigation-menu'>
                <Menu pointing secondary>
                    {routerLinks.map(generateMenuLinks)}
                </Menu>
            </div>
        )
    }
}
