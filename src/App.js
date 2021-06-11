import React, { useState } from 'react';
import './styles/global.css'
import './App.css'

import githubExplorerImage from './assets/logo.svg'

function App() {
    const [username, setUsername] = useState()
    const [repositories, setRepositories] = useState([])
    const [error, setError] = useState()

    async function handleSubmit() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`)
            const data = await response.json()

            if (data.message == "Not Found" || data.length == 0 ) {
                setError("User not found");
                setRepositories()
            }
            else {
                setRepositories(data)
                console.log((data))
            }
        } catch (e) {
            setError(e);
        }

    }

    return (
        <div className="app-container">
            <header>
                <div className="header-container">
                    <img src={githubExplorerImage} alt="Github Explorer" />
                    <div>
                        <input type="text" onChange={event => setUsername(event.target.value)} />
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="app-container">

                    <ul>
                        {Array.isArray(repositories) ? (repositories.map(repository => (
                            <li className="repository-item">
                                <div>
                                    <strong>{repository.name}</strong>

                                    <span>{repository.language}</span>
                                </div>
                                <a target="blank" href={repository.html_url}>Access</a>

                            </li>
                        ))) : (
                            <p id="errormessage"> {error} </p>
                        )}

                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;
