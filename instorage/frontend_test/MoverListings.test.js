import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import FilterBar from "../src/containers/MoverListings/FilterBar"
import MoverListings from "../src/containers/MoverListings/MoverListings"
import MovingJob from "../src/containers/MoverListings/MovingJob"
import MovingJobModal from "../src/containers/MoverListings/MovingJobModal"
import MovingJobsList from "../src/containers/MoverListings/MovingJobsList"

describe('FilterBar', () => {
	const wrapper = shallow(<FilterBar />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MoverListings', () => {
	const wrapper = shallow(<MoverListings />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MovingJob', () => {
	const data = {
		_moveDate: "12/1/2019",
		_moveTime: "12:00PM",
		_hostAddress: "940 Tiverton Ave",
		_clientAddress: "532 Midvale Ave",
		_inventoryPhotoURL: "",
	};

	const wrapper = shallow(<MovingJob movingJob={data}/>);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MovingJobModal', () => {
	const wrapper = shallow(<MovingJobModal />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('MovingJobsList', () => {
	const wrapper = shallow(<MovingJobsList />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})