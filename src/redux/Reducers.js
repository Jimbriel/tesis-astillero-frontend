import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import chatReducer from "./chats/Reducer";
import notesReducer from "./notes/Reducer";
import contactReducer from "./contacts/";
import emailReducer from "./email/";
import maintodoReducer from "./todos/Todos";
import todoReducer from "./todos/";
import authReducer from "./auth/authDucks";
import obrasReducer from "./obras/ObrasDucks";
import empleadoReducer from "./empleado/EmpleadosDucks";
import contratistaReducer from "./contratista/ContratistaDucks";

const Reducers = combineReducers({
  settings,
  chatReducer,
  contactReducer,
  emailReducer,
  notesReducer,
  todoReducer,
  maintodoReducer,
  auth: authReducer,
  obras: obrasReducer,
  empleados: empleadoReducer,
  contratistas: contratistaReducer,
});

export default Reducers;
