
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    
    // Load saved todos from localStorage
    loadTodos();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
    });
    
    function addTodo(todoText) {
        if (todoText.trim() === '') return;
        
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleCompleted);
        
        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todoText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTodo);
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(textSpan);
        todoItem.appendChild(deleteBtn);
        
        todoList.appendChild(todoItem);
        
        saveTodos();
    }
    
    function toggleCompleted(e) {
        const todoItem = e.target.parentElement;
        todoItem.classList.toggle('completed');
        saveTodos();
    }
    
    function deleteTodo(e) {
        const todoItem = e.target.parentElement;
        todoItem.remove();
        saveTodos();
    }
    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            JSON.parse(savedTodos).forEach(todo => {
                addTodo(todo.text);
                const items = document.querySelectorAll('.todo-item');
                const lastItem = items[items.length - 1];
                if (todo.completed) {
                    lastItem.classList.add('completed');
                    lastItem.querySelector('input[type="checkbox"]').checked = true;
                }
            });
        }
    }
});