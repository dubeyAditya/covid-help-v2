/** Import React */
import * as React from "react";

/** Import Test Environment */
import { shallow, ShallowWrapper } from "enzyme";

/** Import Tested Component */
import Invetment from "./Investment";

describe("<Invetment />", () => {

    describe("default", () => {
        let html: ShallowWrapper;

        beforeAll(() => {
            html = shallow(<Invetment />);
        });

        it("should render a <div />", () => {
            expect(html.contains(<div />)).toBe(true);
        });
    });
});
