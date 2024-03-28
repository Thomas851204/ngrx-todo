Feature: Can I add to the list?
    I want to know if I can add a new task to the list

    Scenario: Process has started
        Given I want to create a new task
        When the onAddTodo() is called
        Then addTodoStarted action is dispatched