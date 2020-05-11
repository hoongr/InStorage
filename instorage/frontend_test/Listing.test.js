import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Listing from "../src/containers/Listing/Listing"
import ListingSubmissionForm from "../src/containers/Listing/ListingSubmissionForm"

describe('Listing', () => {
	const wrapper = shallow(<Listing />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('ListingSubmission', () => {
	const wrapper = shallow(<ListingSubmissionForm />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})