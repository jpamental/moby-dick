# MOBY-DICK; or, THE WHALE.
_By Herman Melville_
## A new look at what a web-based book could be.

This project is a companion to a newsletter series exploring what can be done to create a compelling long-form reading experience on the web. Using variable fonts and modern CSS techniques for better web typography and layout, the goal is to make a better book than, well, an actual physical book (and surpass what's currently possible in eBooks along the way).

## Live URL

The latest version of this code is automatically deployed to [Netlify](https://www.netlify.com/) and is findable at https://mobydick.wales


## Setup

This book site is set up using the [static site generator Eleventy](https://www.11ty.dev/). If you want to use the build process, run the command `npm install`, and that should install the bits that you need (presuming you have Node and NPM installed already)

To run the build process and serve the site locally, use this combination of commends to build the Sass files and build/serve the site: `gulp & npx @11ty/eleventy --serve`

## Just the site

If you want to just look at or work with the pre-built site, take a peek in the `_site` directory.

## The latest is live

Each time a new issue of the newsletter comes out, a new release will be tagged so while the latest code will always be live, you can always step back in time to see the code as it was for previous issues. [You can see all the releases here](https://github.com/jpamental/moby-dick/releases)

## Newsletter issues

As they are published, links to each relevant issue of Web Typography News will be linked here.

- [Landing the whale: making a book on the web, part 1](https://rwt.io/typography-tips/landing-whale-making-book-web-part-1)
- [Part 2: Making the typography responsive and laying foundations for more to come](https://rwt.io/typography-tips/part-2-making-typography-responsive-and-laying-foundations-more-come)
- [Part 3: Adding web fonts—giving voice to our words](https://rwt.io/typography-tips/adding-web-fonts-giving-voice-our-words)