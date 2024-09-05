import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ToDoLists from "./ToDoLists";
import AppLayout from "./AppLayout";
import CreateToDo from "./CreateToDo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/to-do-list"></Navigate>}
        ></Route>
        <Route path="/" Component={AppLayout}>
          <Route path="to-do-list" element={<ToDoLists></ToDoLists>}></Route>
          <Route
            path="create-to-do/:index?"
            element={<CreateToDo></CreateToDo>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
