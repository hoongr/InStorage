import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import LocationSearchInput from "../src/containers/Map/LocationSearchInput"
import MapContainer from "../src/containers/Map/MapContainer"
import MapTest from "../src/containers/Map/MapTest"
import Marker from "../src/containers/Map/Marker"

describe('LocationSearchInput', () => {
	const wrapper = shallow(<LocationSearchInput />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MapContainer', () => {
	const wrapper = shallow(<MapContainer />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MapTest', () => {
	const wrapper = shallow(<MapTest />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('Marker', () => {
	const wrapper = shallow(<Marker />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})
