/** Import React */
import * as React from "react";

/** Import Test Environment */
import { shallow, ShallowWrapper } from "enzyme";

/** Import Tested Component */
import InvestmentDetails from "./InvestmentDetails";

describe("<InvestmentDetails />", () => {

    describe("default", () => {
        let html: ShallowWrapper;

        beforeAll(() => {
            html = shallow(<InvestmentDetails />);
        });

        it("should render a <div />", () => {
            expect(html.contains(<div />)).toBe(true);
        });
    });
});
