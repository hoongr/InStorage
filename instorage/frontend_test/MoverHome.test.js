import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import JobModal from "../src/containers/MoverHome/JobModal";

describe('JobModal', () => {
	const data = {
		_moveDate: "12/1/2019",
		_moveTime: "12:00PM",
		_hostAddress: "940 Tiverton Ave",
		_clientAddress: "532 Midvale Ave",
		_inventoryPhotoURL: "",
		clientName: "Joe Bruin",
	};

	const wrapper = shallow(<JobModal job={data}/>);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})