# MOBY-DICK; or, THE WHALE.
_By Herman Melville_
## A new look at what a web-based book could be.

This project is a companion to a newsletter series exploring what can be done to create a compelling long-form reading experience on the web. Using variable fonts and modern CSS techniques for better web typography and layout, the goal is to make a better book than, well, an actual physical book (and surpass what's currently possible in eBooks along the way).

## Live URL

The latest version of this code is automatically deployed to [Netlify](https://www.netlify.com/) and is findable at https://mobydick.rwt.io


## Setup

This book site is set up using the [static site generator Eleventy](https://www.11ty.dev/). If you want to use the build process, run the command `npm install`, and that should install the bits that you need (presuming you have Node and NPM installed already)

To run the build process and serve the site locally, use this combination of commends to build the Sass files and build/serve the site: `gulp & npx @11ty/eleventy --serve`

## Just the site

If you want to just look at or work with the pre-built site, take a peek in the `_site` directory.