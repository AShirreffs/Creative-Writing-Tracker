import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CharacterSection from "./components/CharacterSection";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectName, setEditingProjectName] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editWeeklyGoal, setEditWeeklyGoal] = useState("");

  const [projectName, setProjectName] = useState("");
  const [genre, setGenre] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");

    if(savedProjects) {
      return JSON.parse(savedProjects);
    }
    return [];
  });

  

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

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

  function deleteProject(id) {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed){
      return;
    }

    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  }

  function startEditingProject(project) {
    setEditingProjectId(project.id);
    setEditingProjectName(project.name);
    setEditGenre(project.genre);
    setEditWeeklyGoal(project.weeklyGoal);
  }

  function saveProjectEdits() {
    const updatedProjects = projects.map((project) => {
      if (project.id === editingProjectId) {
        return {
          ...project,
          name: editingProjectName,
          genre: editGenre,
          weeklyGoal: editWeeklyGoal,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setEditingProjectId(null);
  }

  if (selectedProject) {
  return (
    <>
      <Navbar />

      <main>
        <button onClick={() => setSelectedProject(null)}>
          ← Back to Projects
        </button>

        <h1>{selectedProject.name}</h1>
        <p>{selectedProject.genre}</p>

        <div className="project-workspace">
          <aside className="project-sidebar">
            <h3>Project</h3>
            <button onClick={() => setActiveSection("overview")}>
              Overview
            </button>
            <button onClick={() => setActiveSection("characters")}>
              Characters
            </button>
            <button onClick={() => setActiveSection("chapters")}>
              Chapters
            </button>
            <button onClick={() => setActiveSection("themes")}>
              Themes
            </button>
          </aside>

          <section className="project-content">
            {activeSection === "overview" && (
              <>
                <h2>Overview</h2>
                <p>Your project details will go here.</p>
              </>
            )}
            {activeSection === "characters" && (
              <CharacterSection 
                selectedProject={selectedProject}
                projects={projects}
                setProjects={setProjects}
                setSelectedProject={setSelectedProject}
              />
            )}
            {activeSection === "chapters" && (
              <>
                <h2>Chapters</h2>
                <p>Your chapter list will go here.</p>
              </>
            )}
            {activeSection === "themes" && (
              <>
                <h2>Themes</h2>
                <p>Your theme tracker will go here.</p>
              </>
            )}
          </section>

          <aside className="goal-sidebar">
            <h3>Weekly Goal</h3>
            <p>0 / {selectedProject.weeklyGoal} words</p>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <button>Log Progress</button>
          </aside>
        </div>
      </main>
    </>
  );
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
                <button
                  className = "project-action-button"
                  onClick={() => setSelectedProject(project)}
                >
                  Open Project
                </button>
                <button
                  className = "project-action-button"
                  onClick={() => startEditingProject(project)}
                >
                  Edit 
                </button>
                <button
                  className = "project-action-button delete-button"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </button>
                {editingProjectId === project.id && (
                  <div className="edit-project-form">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={editingProjectName}
                      onChange={(event) =>
                        setEditingProjectName(event.target.value)
                      }
                    />

                    <label>Genre</label>
                    <input
                      type="text"
                      value={editGenre}
                      onChange={(event) =>
                        setEditGenre(event.target.value)
                      }
                    />

                    <label>Weekly Goal</label>
                    <input
                      type="number"
                      value={editWeeklyGoal}
                      onChange={(event) =>
                        setEditWeeklyGoal(event.target.value)
                      }
                    />

                    <div className="form-buttons">
                      <button onClick={saveProjectEdits}>
                        Save Changes
                      </button>

                      <button
                        className="cancel-button"
                        onClick={() => setEditingProjectId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                    </div>
                  )}
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