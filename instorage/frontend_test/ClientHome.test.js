import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import ClientHome from "../src/containers/ClientHome/ClientHome"
import ListingCard from "../src/containers/ClientHome/ListingCard"

describe('ClientHome', () => {
	const wrapper = shallow(<ClientHome />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('ListingCard', () => {
	const data = {
		_hostAddress: "940 Tiverton Ave",
		_dateEnd: "12/31/2019",
		_dateStart: "12/1/2019",
		_inventoryPhotoURL: "",
	};

	const wrapper = shallow(<ListingCard listing={data}/>);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})