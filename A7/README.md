# Task Manager Application - A7 Assignment

## Project Overview

This is a Task Manager Application built using only HTML, CSS and Vanilla JavaScript. No frameworks or libraries were used. The project demonstrates core DOM manipulation concepts, event handling and the browser rendering pipeline.

---

## Features

- Add tasks with title and category
- Edit, complete and delete tasks
- Theme toggle (Dark / Light mode)
- Search tasks
- Filter by category
- Task counters (Total, Pending, Done)
- Clear all tasks
- Local Storage support (tasks saved on refresh)
- Event Propagation Demo (Bubbling + Capturing)
- Attributes vs Properties Demo
- Browser Rendering Pipeline visual section

---

## Concepts Explained

### Parsing

Parsing means the browser reads the HTML file from top to bottom and converts it into something it can work with. It reads the characters one by one and tries to understand the structure.

### Tokenization

During parsing, the browser breaks the HTML into small chunks called tokens. A token can be a start tag like `<div>`, an end tag like `</div>`, or text content. These tokens are like building blocks.

### DOM Tree

After tokenizing, the browser builds the DOM (Document Object Model) Tree. Each HTML element becomes a node in this tree. The tree shows the parent-child relationship between all elements. For example `<body>` is a child of `<html>`.

### CSSOM Tree

Similar to DOM, the browser also parses CSS and creates the CSSOM (CSS Object Model) Tree. Every CSS rule becomes part of this tree. Each node stores computed style information for a specific element.

### Render Tree

The DOM Tree and CSSOM Tree are combined to create the Render Tree. Only visible elements are included in the Render Tree. For example, elements with `display: none` are NOT part of the Render Tree. The browser uses the Render Tree to figure out what to draw on screen.

---

## Event Bubbling

When you click an element, the event starts at that element and then travels UP the DOM tree to parent elements. This is called Bubbling.

**Order of execution:**
1. Child
2. Parent
3. Grandparent

Example in code:
```js
childBtn.addEventListener("click", function() {
  console.log("Child");
});
parent.addEventListener("click", function() {
  console.log("Parent");
});
grandparent.addEventListener("click", function() {
  console.log("Grandparent");
});
```

---

## Event Capturing

In Capturing mode (also called the capture phase), the event starts at the ROOT and travels DOWN to the target element. You enable this by passing `true` as the third argument to addEventListener.

**Order of execution:**
1. Grandparent
2. Parent
3. Child

Example in code:
```js
grandparent.addEventListener("click", function() {
  console.log("Grandparent");
}, true);  // true = capture phase

parent.addEventListener("click", function() {
  console.log("Parent");
}, true);

childBtn.addEventListener("click", function() {
  console.log("Child");
}, true);
```

---

## Event Delegation

Instead of adding a separate event listener to every single task card button, we add ONE listener to the parent container. When any button inside is clicked, the event bubbles up to the container and we check what was clicked using `event.target`.

This is much more efficient especially when you have many dynamic elements.

```js
taskContainer.addEventListener("click", function(event) {
  var action = event.target.dataset.action;
  var card = event.target.closest(".task-card");

  if (action === "delete") {
    // handle delete
  } else if (action === "edit") {
    // handle edit
  }
});
```

---

## Attributes vs Properties

**Attribute** - This is what is written in the HTML source. It is the initial value.

**Property** - This is the live JavaScript property on the DOM element. It reflects the current state.

Example:
- `input.getAttribute("value")` returns the original value written in HTML (doesn't change as user types)
- `input.value` returns whatever the user has typed right now (live value)

---

## DOM Methods Used

| Method | Used For |
|---|---|
| `createElement()` | Creating new task cards |
| `createTextNode()` | Adding text to elements |
| `append()` | Adding multiple children at once |
| `appendChild()` | Adding child nodes |
| `prepend()` | Adding tasks at top of list |
| `after()` | Showing "edited" note after a card |
| `remove()` | Deleting tasks |
| `replaceWith()` | Demonstrated in edit flow |
| `setAttribute()` | Setting data attributes on cards |
| `getAttribute()` | Reading data attributes |
| `removeAttribute()` | Removing attributes |
| `hasAttribute()` | Checking if attribute exists |
| `dataset` | Accessing data-* attributes |
| `classList` | Adding/removing CSS classes |

---

## Technologies Used

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla - no libraries)

---

## How to Run

Just open `index.html` in any browser. No setup needed.

---

## Submission

- GitHub Repo: https://github.com/darshan-patil08

---

*Made by Darshan Patil | Cohort 3.0 | A7 Assignment*
