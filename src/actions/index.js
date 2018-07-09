import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

export const addReminder = (text, dueDate) => {
  const action = {
    type: ADD_REMINDER,
    text: text,
    dueDate
  }
  /* Hier wurde nun einmal die lange Schreibweise verwendet, mit key und value
   * (bei text: text) und einmal die Kurzschreibweise, weil key und value die selbe
   * Kennung haben (dueDate) */
  console.log('action in addReminder', action);
  return action;
}

export const deleteReminder = (id) => {
  const action =  {
    type: DELETE_REMINDER,
    id
  }
  console.log('deleting in actions', action);
  return action;
}

export const clearReminders = () => {
  return {
    type: CLEAR_REMINDERS
  }
}
