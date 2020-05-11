import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Dashboard from "../src/containers/ClientDashboard/Dashboard"
import DashboardListing from "../src/containers/ClientDashboard/DashboardListing"

describe('Dashboard', () => {
	const wrapper = shallow(<Dashboard />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('DashboardListing', () => {
	const wrapper = shallow(<DashboardListing />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})