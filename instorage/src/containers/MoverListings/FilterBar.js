import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
} from 'react-bootstrap';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const now = moment().hour(0).minute(0);

const FilterBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  function updateDates(start, end) {
    setStartDate(start);
    setEndDate(end);
  }
  return (
    <Container
      style={{
        height: "auto",
        borderBottom: "1px solid black",
        padding: "15px",
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 5,
      }}
      fluid
    >
      <Row>
        <Col xs={3} className="align-self-center">
          Date: {' '}
          <DateRangePicker
            small
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => updateDates(startDate, endDate)} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          />
        </Col>
        <Col xs="fit-content" className="align-self-center">
          Price: {' '}
        </Col>
        <Col xs={2} className="align-self-center">
          <Range
            min={0}
            max={19}
            marks={{
              0: "0",
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default FilterBar;
