import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import Truncate from 'react-truncate'
import { timezone } from '@google/maps/lib/apis/timezone';
import { withRouter } from "react-router-dom";

class ConversationItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <style type="text/css">
          {`
            .img-size {
              width: 50%;
              height: auto;
            }
          `}
        </style>
        <ListGroup className="m-auto d-table h150px w90 list-group-horizontal">
          <ListGroup.Item className="d-table-cell align-middle w20 text-center no-border-right">
            <div>
              <img className="circle-profile-pic cropped-pic" src={this.props.profile} alt="me"/>
              {/* <div className='tiny-text'>{this.props.label}</div> */}
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-table-cell align-middle w60 no-border-left no-border-right">
            <h4>
              {this.props.label}
            </h4>
          </ListGroup.Item>
          {/* <ListGroup.Item className="d-table-cell align-middle w60 no-border-left no-border-right">
            <div>
              <Truncate lines={3}>
                {this.props.body}
              </Truncate>
            </div>
          </ListGroup.Item> */}
          <ListGroup.Item className="d-table-cell text-center align-middle w30 no-border-left">
            <div>
              <Button size="md" variant="outline-primary"
                onClick={() => {
                  this.props.history.push('/chat/' + this.props.userB)
                }}
              >View messages</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default withRouter(ConversationItem);