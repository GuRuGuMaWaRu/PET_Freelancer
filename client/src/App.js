import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/projects")
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    projects && (
      <div>
        {projects.map(project => (
          <div key={project._id}>{project.projectNr}</div>
        ))}
      </div>
    )
  );
}

export default App;
