import React, { useState, useEffect } from 'react';
import './addTask.styles.css';
import { PlusCircle, Trash2, CheckCircle, Circle, Calendar } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const AddTask = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    
    useEffect(() => {
        fetchTasks();
    }, []); // Initial fetch
    
    // Setup axios interceptor for auth token
    useEffect(() => {
        const setupAxiosInterceptor = async () => {
            try {
                const token = await getToken();
                axios.interceptors.request.use((config) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return config;
                });
                // After setting up interceptor, fetch tasks
                fetchTasks();
            } catch (error) {
                console.error('Error setting up auth:', error);
                setError('Error setting up authentication');
            }
        };
        
        setupAxiosInterceptor();
    }, [getToken]);

    const fetchTasks = async () => {
        try {
            const token = await getToken();
            const response = await axios.get('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setTodos(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching tasks: ' + (error.response?.data?.message || error.message));
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        
        const todo = {
            name: newTodo.trim(),
            priority: priority,
            completed: false,
            dueDate: dueDate || undefined,
        };
        
        try {
            const token = await getToken();
            await axios.post('/api/tasks', todo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTasks(); // Refresh the list
            setNewTodo('');
            setDueDate('');
            setPriority('Medium');
            setError(null);
        } catch (error) {
            setError('Error adding task: ' + error.message);
            console.error('Error adding task:', error);
        }
    };

    const toggleTodo = async (id) => {
        const todo = todos.find(t => t._id === id);
        try {
            const token = await getToken();
            await axios.put(`/api/tasks/${id}`, {
                ...todo,
                completed: !todo.completed
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTasks(); // Refresh the list
            setError(null);
        } catch (error) {
            setError('Error updating task: ' + error.message);
            console.error('Error updating task:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const token = await getToken();
            await axios.delete(`/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTasks(); // Refresh the list
            setError(null);
        } catch (error) {
            setError('Error deleting task: ' + error.message);
            console.error('Error deleting task:', error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-yellow-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const formatDueDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className="addTask">
            <div className='header'>
                <h1>Tasks</h1>
            </div>
            {error && (
                <div className="error-message text-red-500 p-2 mb-4">
                    {error}
                </div>
            )}
            <div className="addTask-container">
                <input 
                    type="text" 
                    placeholder="Add a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="task-input"
                />
                <select
                    className="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    className="date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button
                    onClick={addTodo}
                    className="submit-btn"
                >
                    <PlusCircle />
                </button>
            </div>

            <div className="todo-list">
                {todos.map(todo => (
                    <div 
                        key={todo._id}
                        className="todo-item"
                    >
                        <div className="todo-content">
                            <button
                                onClick={() => toggleTodo(todo._id)}
                                className="toggle-btn"
                            >
                                {todo.completed ? (
                                    <CheckCircle className="check-icon" />
                                ) : (
                                    <Circle className="circle-icon" />
                                )}
                            </button>
                            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                {todo.name}
                            </span>
                            <span className={`todo-priority ${getPriorityColor(todo.priority)}`}>
                                {todo.priority}
                            </span>
                            {todo.dueDate && (
                                <span className="todo-date">
                                    <Calendar className="calendar-icon" />
                                    {formatDueDate(todo.dueDate)}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => deleteTodo(todo._id)}
                            className="delete-btn"
                        >
                            <Trash2 className="trash-icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddTask;