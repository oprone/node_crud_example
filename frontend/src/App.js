// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// frontend/src/App.js
import React from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>
            <ItemForm />
            <ItemList />
        </div>
    );
}

export default App;
