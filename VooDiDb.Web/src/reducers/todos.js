const getTodos = function() {
  try {
    let data = localStorage.getItem('todos');
    if(data) {
      return JSON.parse(data);
    } else {
      setTodos([]);
      return getTodos();
    }
  } catch(e) {
    return null;
  }
};

const setTodos = function(data) {
  try {
    localStorage.setItem('todos', JSON.stringify(data));
  } catch(e) { }
}

const todos = (state = getTodos(), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      let data = [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
      setTodos(data);
      return data;
    case 'TOGGLE_TODO':
      data = state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
      setTodos(data);
      return data;
    default:
      return state
  }
}

export default todos
