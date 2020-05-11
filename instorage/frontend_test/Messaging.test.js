import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Messages from "../src/containers/Messaging/Messages"
import ConversationItem from "../src/containers/Messaging/ConversationItem"
import Conversations from "../src/containers/Messaging/Conversations"

describe('Messages', () => {
	const wrapper = shallow(<Messages />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('ConversationItem', () => {
	const wrapper = shallow(<ConversationItem />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})

describe('Conversations', () => {
	const wrapper = shallow(<Conversations />);

	test("renders without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	test("should match the snapshot", () => {
	  expect(wrapper).toMatchSnapshot();
	});
})