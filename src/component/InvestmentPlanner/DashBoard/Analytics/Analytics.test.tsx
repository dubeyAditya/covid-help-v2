/** Import React */
import * as React from "react";

/** Import Test Environment */
import { shallow, ShallowWrapper } from "enzyme";

/** Import Tested Component */
import Analytics from "./Analytics";

describe("<Analytics />", () => {

    describe("default", () => {
        let html: ShallowWrapper;

        beforeAll(() => {
            html = shallow(<Analytics />);
        });

        it("should render a <div />", () => {
            expect(html.contains(<div />)).toBe(true);
        });
    });
});
