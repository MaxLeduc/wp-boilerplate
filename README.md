# WordPress Boilerplate

This WordPress boilerplate theme can be use to kick start quickly any WP project. Simply download/clone this repo in our theme's folder and active it in the WP backend.

# Getting Started

1. `git clone https://github.com/MaxLeduc/wp-boilerplate.git`
1. `cd wp-boilerplate`
1. `npm start` (your browser should automatically open up to `http://localhost:3000`)

NB: the hot reloading is broadcasting localhost:8888. If you are running your WP project on another port, make sure to reflect that on line 44 of `gulpfile.js`.

## Working with this theme

This project uses a component-based approach. When creating new sections and component for your theme, you should:

1. Create a new folder in `/src/components`. 
1. Create a scss in that folder. This will automatically add it to the general stylesheet.
1. Create an `index.js` and require it in the `index.js` located in the `components` root file. This will automatically add your script to the component script.

Finally, we recommend adding your component to your templates in one of these ways:

`get_template_part('src/components/example-component/example', 'component');`

or

`include(locate_template('src/components/example-component/example-component.php));`

## Dependencies:

Please make sure you have these installed on your machine before getting started:

- [Node](https://nodejs.org/en/)

## Acknowledgements

- This theme was originally derived from the hackerYou starter theme https://github.com/HackerYou/wordpress_starter_theme.git.
- Special Thanks to `themarkappleby` for his contribution to this project.