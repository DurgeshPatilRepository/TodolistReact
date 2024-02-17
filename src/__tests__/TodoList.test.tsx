import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/ToDoApp';

describe('UI Rendering', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  let input;

  beforeEach(() => {
    render(<TodoList />);
    input = screen.getByPlaceholderText(/Add a new task/i);
  });

  test('adds a new task', () => {
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
  });

  test('toggles completion of a task', () => {
    fireEvent.change(input, { target: { value: 'Toggle Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const checkbox = screen.getByLabelText(/Toggle Task/i);
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('filters tasks by status', () => {
   
    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: 'Completed Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const activeButton = screen.getByText(/Active/i);
    console.log('Active button:', activeButton);
    
    expect(screen.getByText(/Active Task/i)).toBeInTheDocument();
    expect(screen.queryByText(/Completed Task/i)).toBeNull();

    fireEvent.click(screen.getByText(/Completed/i));
    expect(screen.getByText(/Completed Task/i)).toBeInTheDocument();
    expect(screen.queryByText(/Active Task/i)).toBeNull();
  });
});
