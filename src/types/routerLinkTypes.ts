import { ComponentClass, FunctionComponent } from "react";

import { RouteComponentProps, StaticContext } from "react-router";

export interface RouterLink {
    name: string;
    path: string;
    component: ComponentClass<any, any> | FunctionComponent<any> | ComponentClass<RouteComponentProps<any, StaticContext, any>, any> | FunctionComponent<RouteComponentProps<any, StaticContext, any>> | undefined
}