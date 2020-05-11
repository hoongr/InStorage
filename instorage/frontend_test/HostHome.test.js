import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import HostHome from "../src/containers/HostHome/HostHome"

describe('HostHome', () => {
	const wrapper = shallow(<HostHome />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})