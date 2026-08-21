import { useState } from "react";

function CharacterSection({
  selectedProject,
  projects,
  setProjects,
  setSelectedProject,
}) {
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [editCharacterId, setEditCharacterId] = useState(null);
  const [editCharacterName, setEditCharacterName] = useState("");
  const [editCharacterDescription, setEditCharacterDescription] = useState("");

  function addCharacter() {
    if (!characterName.trim()) {
      return;
    }

    const newCharacter = {
      id: Date.now(),
      name: characterName,
      description: characterDescription,
    };

    const updatedCharacters = [
      ...(selectedProject.characters || []),
      newCharacter,
    ];

    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          characters: updatedCharacters,
        };
      }

      return project;
    });

    setProjects(updatedProjects);

    setSelectedProject({
      ...selectedProject,
      characters: updatedCharacters,
    });

    setCharacterName("");
    setCharacterDescription("");
  }

  function startEditCharacter (character) {
    setEditCharacterId(character.id);
    setEditCharacterName(character.name);
    setEditCharacterDescription(character.description);
  }

  function saveCharacterEdits() {
    const updatedCharacters = (selectedProject.characters || []).map(
        (character) => {
        if (character.id === editCharacterId) {
            return {
            ...character,
            name: editCharacterName,
            description: editCharacterDescription,
            };
        }

        return character;
        }
    );

    const updatedProject = {
        ...selectedProject,
        characters: updatedCharacters,
    };

    const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id
        ? updatedProject
        : project
    );

    setSelectedProject(updatedProject);
    setProjects(updatedProjects);
    setEditCharacterId(null);
  }


  return (
    <div>
      <h2>Characters</h2>
      <p>Keep track of the characters in your story.</p>

      <div className="character-form">
        <label>Character Name:</label>

        <input
          type="text"
          placeholder="Enter character name"
          value={characterName}
          onChange={(event) => setCharacterName(event.target.value)}
        />

        <label>Character Description:</label>

        <textarea
          placeholder="Add a short description..."
          value={characterDescription}
          onChange={(event) =>
            setCharacterDescription(event.target.value)
          }
        />

        <button onClick={addCharacter}>
          + Add Character
        </button>
      </div>

      <div className="character-list">
        {(selectedProject.characters || []).length === 0 ? (
          <p>No characters added yet.</p>
        ) : (
          selectedProject.characters.map((character) => (
            <div
              className="character-card"
              key={character.id}
            >
              <h3>{character.name}</h3>
              <p>{character.description}</p>

              <button
                className="project-action-button"
                onClick={() => startEditCharacter(character)}
              >
                Edit
              </button>
              {editCharacterId === character.id && (
                <div className="edit-character-form">
                    <label>Character Name</label>
                    <input
                    type="text"
                    value={editCharacterName}
                    onChange={(event) =>
                        setEditCharacterName(event.target.value)
                    }
                    />

                    <label>Description</label>
                    <textarea
                    value={editCharacterDescription}
                    onChange={(event) =>
                        setEditCharacterDescription(event.target.value)
                    }
                    />

                    <div className="form-buttons">
                    <button onClick={saveCharacterEdits}>
                        Save Changes
                    </button>

                    <button
                        className="cancel-button"
                        onClick={() => setEditCharacterId(null)}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CharacterSection;