/** Import React */
import * as React from "react";

/** Import Test Environment */
import { shallow, ShallowWrapper } from "enzyme";

/** Import Tested Component */
import InvestmentTable from "./InvestmentTable";

describe("<InvestmentTable />", () => {

    describe("default", () => {
        let html: ShallowWrapper;

        beforeAll(() => {
            html = shallow(<InvestmentTable />);
        });

        it("should render a <div />", () => {
            expect(html.contains(<div />)).toBe(true);
        });
    });
});
