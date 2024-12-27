import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import About from './components/about';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const item = todos.find((todo) => todo.id === id);
    setTodo(item.todo);
    setTodos(todos.filter((todo) => todo.id !== id));
    saveData();
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveData();
  };

  const handleAdd = () => {
    if (todo.trim().length > 3) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
      saveData();
    }
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveData();
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-teal-100 min-h-[80vh] md:w-[35%]">
              <h1 className="font-bold text-center text-3xl">To-DO List - Plan Your Day</h1>
              <div className="addTodo my-5 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Add a To-Do</h2>
                <div className="flex">
                  <input
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    type="text"
                    className="w-full rounded-full px-5 py-1"
                  />
                  <button
                    onClick={handleAdd}
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-md mx-6 p-3 py-1"
                    disabled={todo.length <= 3}
                  >
                    Save
                  </button>
                </div>
              </div>
              <input
                className="my-4"
                id="show"
                onChange={toggleFinished}
                type="checkbox"
                checked={showFinished}
              />
              <label className="mx-2" htmlFor="show">
                Show Finished
              </label>
              <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
              <h2 className="text-2xl font-bold">Your To-Do's</h2>
              <div className="todos">
                {todos.length === 0 && <div className="m-5">No To-Do's to display</div>}
                {todos.map((item) =>
                  showFinished || !item.isCompleted ? (
                    <div key={item.id} className="todo flex my-3 justify-between">
                      <div className="flex gap-5">
                        <input
                          name={item.id}
                          onChange={() => handleCheckbox(item.id)}
                          type="checkbox"
                          checked={item.isCompleted}
                        />
                        <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                      </div>
                      <div className="buttons flex h-full">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md mx-2 p-3 py-1"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md mx-2 p-3 py-1"
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          }
        />
        {/* About Page */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
