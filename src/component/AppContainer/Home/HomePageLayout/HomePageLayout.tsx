import React, { Component } from 'react'

/** Stylesheet Imports */
import "./HomePageLayout.scss";


import {
    Button,
    Container,
    Header,
    Icon,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
// const getWidth = () => {
//     const isSSR = typeof window === 'undefined'

//     return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
// }

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

interface IHomepageHeading {
    mobile?: boolean;
}

const HomepageHeading: React.FunctionComponent<IHomepageHeading> = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Investment Planner'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Power to Your Business for Future Predictions '
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
      {/* <Icon name='right arrow' /> */}
        </Button>
    </Container>
)

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

interface IDesktopContainer {
    children: React.ReactNode,
}

class DesktopContainer extends Component<IDesktopContainer> {
    state = { fixed: false }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: '100vh', padding: '1em 0em' }}
                        vertical>
                        <Menu
                            fixed='top'
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'>
                            <Container>
                                <Menu.Item as='a' active>Home</Menu.Item>
                                <Menu.Item as='a'>Analytics</Menu.Item>
                                <Menu.Item as='a'>Auditlogs</Menu.Item>
                                <Menu.Item as='a'>Investment</Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted={!fixed}>
                                        Log in
                                    </Button>
                                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>
                {children}
            </Responsive>
        )
    }
}


class MobileContainer extends Component {
    state = { sidebarOpened: false }

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                // getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}>
                    <Menu.Item as='a' header>Home</Menu.Item>
                    <Menu.Item as='a'>Analytics</Menu.Item>
                    <Menu.Item as='a'>Auditlogs</Menu.Item>
                    <Menu.Item as='a'>Investment</Menu.Item>
                    <Menu.Item as='a'>Log in</Menu.Item>
                    <Menu.Item as='a'>Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                                    </Button>
                                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

interface IResponsiveContainer {
    children: React.ReactNode,
}

const ResponsiveContainer: React.FunctionComponent<IResponsiveContainer> = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)


const HomepageLayout: React.FunctionComponent = () => (
    <ResponsiveContainer >

    </ResponsiveContainer>
)
export default HomepageLayout