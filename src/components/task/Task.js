import React from 'react';
import { connect } from 'react-redux';
import Moment from "moment";
import makeDateFromMomentObj from "../../myPlugins/functions/makeDateFromMomentObj";
import { Link } from 'react-router-dom';
import cutText from "../../myPlugins/functions/cutText";
import cleanHtml from "../../myPlugins/functions/cleanHtml";
import breakText from "../../myPlugins/functions/breakText";

const Task = (props) => {

  const {
    title
    , content: rawContent
    , deadline
    , createdAt
    , doneAt
    , id
    , colClass
  }=props;

  const content = cleanHtml(breakText(rawContent));

  return (
    <div className={ colClass }>
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title text-primary">{ title }</h3>
          <p
            className="card-text border border-primary border-2 rounded lead p-2 my-4"
            dangerouslySetInnerHTML={{__html: cutText({length: 50, text:content})}}
          ></p>
          <Link to={`/task/${id}`} className="btn btn-primary"><i className="fas fa-eye"></i> View Task</Link>
        </div>
        <div className="p-3 card-footer">
          <h6 className="mb-2 card-subtitle text-danger"><i className="fas fa-flag-checkered"></i> Deadline: { makeDateFromMomentObj(Moment(deadline).toObject()) }</h6>
          { doneAt && <h6 className="mb-2 card-subtitle text-success"><i className="fas fa-check-circle"></i> Done: { Moment(doneAt.toDate()).calendar() }</h6> }
          <h6 className="card-subtitle text-muted">created: { Moment(createdAt.toDate()).calendar() }</h6>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ firebase }) => ({
  firebaseAuth: firebase.auth
});

export default connect(mapStateToProps)(Task);