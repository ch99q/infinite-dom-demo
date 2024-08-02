# Infinite DOM Demo

This project is a demonstration of creating an infinite canvas with nodes and arrows between elements using HTML, JavaScript, and SVG. The project includes an editor interface that allows users to interact with the canvas and nodes.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/ch99q/infinite-dom-demo.git
   cd infinite-dom-demo
   ```

2. Install Deno if you haven't already. Follow the instructions on the [Deno website](https://deno.land/#installation).

## Usage Instructions

1. Start the application using Deno:
   ```sh
   deno task start
   ```

2. Open your web browser and navigate to `http://localhost:8000` to view the application.

## File Descriptions

- `app/arrow.html`: Demonstrates creating an SVG with arrows between elements.
- `app/canvas.js`: Handles canvas transformations and rendering.
- `app/index.html`: Sets up the main editor interface.
- `app/index.js`: Initializes the editor and creates a grid of nodes.
- `app/node.js`: Defines the `Node` class for creating and managing nodes.
- `app/utils.js`: Provides utility functions for DOM manipulation and event handling.
- `deno.json`: Contains a task to start the application using Deno.
- `mod.js`: Sets up a server using the Hono framework to serve static files from the `app` directory.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.

