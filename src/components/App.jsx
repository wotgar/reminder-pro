import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminders } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    console.log(this); // In dieser Form wird die gesamte App geloggt, samt aller Props, State, etc.
    this.props.addReminder(this.state.text, this.state.dueDate); // Hier wird der ActionCreator aufgerufen. Siehe actions/index.js
  }

  deleteReminder(id) {
    console.log('deleting in application', id);
    console.log(this.props);
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return(
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}
                  >
                  &#x2715; {/*Ein Unicode-Symbol*/}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        { this.renderReminders() }
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}>
          Clear Reminders
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) { // Scheint eine interne REDUX-Funktion zu sein. Dispatch ebenso. Letztere kümmert sich darum, dass eine Action einen State Change triggern kann.
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

function mapStateToProps(state) {
  console.log(state);
  return {
    reminders: state
  }
}

{/*Connect ist auch wieder eine REDUX-Funktion. Sie verbindet die Komponente mit dem globalen State, sodass die Props dieser Komponente in anderen Komponenten verwendet werden können.*/}
export default connect(mapStateToProps, mapDispatchToProps)(App);
