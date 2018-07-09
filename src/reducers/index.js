import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let { text, dueDate } = action; // Die beiden Variablen werden entsprechend ihrem gleichnamigen Key (wieder einmal ES6 shorthand) aus der Action zugewiesen
  return {
    id: Math.random(),
    text: text,
    dueDate: dueDate
  } // Zusätzlich zum eingegebenen Text lassen wir eine zufällige ID generieren.
}

const removeById = (state = [], id) => {
  /* Die Idee ist hier, dass ein neues Array erzeugt wird, von dem der gelöschte
   * Eintrag ausgefiltert ist. Dieses neue Array wird dann in den State gegeben. */
  const reminders = state.filter(reminder => reminder.id !== id);
  console.log('new reduced reminders', reminders);
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders'); // Somit wird das State-Array gleich aus den Cookies befüllt
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)] // ... ist der spread operator. Damit kann man den Inhalt eines Arrays einkopieren.
      bake_cookie('reminders', reminders);
      return reminders; // Return macht einen Break unnötig
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = []; // Wir verweisen einfach auf ein leeres Array
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;
