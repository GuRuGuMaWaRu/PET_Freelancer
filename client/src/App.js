import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [projects, setProjects] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("/projects")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);
  return <div>Hello!</div>;
}

export default App;
