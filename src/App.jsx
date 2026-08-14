import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [genre, setGenre] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");

  function createProject() {
    const newProject = {
      id: Date.now(),
      name: projectName,
      genre: genre,
      weeklyGoal: weeklyGoal,
    }
    setProjects([...projects, newProject]);

    setProjectName("");
    setGenre("");
    setWeeklyGoal("");
    setShowForm(false);
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>Your Projects</h1>
        <p>Your projects will appear here.</p>

        {projects.length === 0 && (
          <div className= "empty-state">
            <h2>No projects yet </h2>
            <p>Create your first project to get started.</p>
            
            <button 
              className = "new-project-button"
              onClick={() => setShowForm(true)}
            >
              + New Project
            </button> 
          </div>
        )}

        {projects.length > 0 && (
          <div className="project-list">
            {projects.map((project) => (
              <div className= "project-card" key={project.id}>
                <h2>{project.name}</h2>
                <p>{project.genre}</p>
                <p>Weekly Goal: {project.weeklyGoal}</p>
              </div>
            ))}
            <button
            className = "new-project-button"
            onClick={() => setShowForm(true)}
            >
              + New Project
            </button>
          </div>
        )}
        
        {showForm && (
          <div className="project-form">
            <h2>Create New Project</h2>

            <label>Project Name</label>
            <input 
            type="text" 
            placeholder = "Enter project name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            />

            <label>Genre</label>
            <input 
            type="text" 
            placeholder = "Fantasy, mystery, romance..."
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            />

            <label>Weekly Word Goal</label>
            <input 
            type="number" 
            placeholder = "5000"
            value={weeklyGoal}
            onChange={(event) => setWeeklyGoal(event.target.value)}
            />

            <div className="form-buttons">
              <button onClick={createProject}>Create Project</button>
              <button
              className = "cancel-button"
              onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;