import React, { Component } from 'react';
import Categories from "./components/Categories";
import Notes from "./components/Notes";
import Note from "./components/Note";

class App extends Component {
    render() {
        return (
          <main className="detectify-container">
              <div className="detectify-sidebar-categories">
                  <Categories/>
              </div>
              <div className="detectify-sidebar-notes">
                  <Notes/>
              </div>
              <div className="detectify-sidebar-note">
                  <Note/>
              </div>
          </main>
        );
    }
}

export default App;
