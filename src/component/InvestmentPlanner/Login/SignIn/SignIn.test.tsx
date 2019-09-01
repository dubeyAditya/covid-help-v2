/** Import React */
import * as React from "react";

/** Import Test Environment */
import { shallow, ShallowWrapper } from "enzyme";

/** Import Tested Component */
import SignIn from "./SignIn";

describe("<SignIn />", () => {

    describe("default", () => {
        let html: ShallowWrapper;

        beforeAll(() => {
            html = shallow(<SignIn />);
        });

        it("should render a <div />", () => {
            expect(html.contains(<div />)).toBe(true);
        });
    });
});
