import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import SignInPage from "../src/containers/SignIn"
import RegisterPage from "../src/containers/Register"
import ListingSubmissionForm from "../src/containers/Listing/ListingSubmissionForm"
import Profile from "../src/containers/Profile"
import Rating from "../src/containers/Rating"

describe('SignIn', () => {
	const wrapper = shallow(<SignInPage />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('Register', () => {
	const wrapper = shallow(<RegisterPage />);

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

describe('Profile', () => {
	const wrapper = shallow(<Profile />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
});

describe('Rating', () => {
	const wrapper = shallow(<Rating />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
});
