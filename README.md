# NeonShop

## Assignment

Build a grid view using all the data we’ve provided in a JSON structure.

You have full creative freedom – so go wild. There’s a catch though!

Try your best to include:

- Pagination
- A search function
- A ‘no results found’ state on search
- Make it accessible and keyboard friendly

Feeling extra fancy? Want to make a lasting impression? Bored and hungry for a challenge? Then go ahead and create your own tile builder using a simple form.

Inputs could include label, description, and image.

Show us what you got!

Please make sure your solution is accessible online

**_A few tips on the code challenge:_**

- Quality over quantity. Give us something simple and well-built.
- Don’t spend ages on it - 3 to 4 hours should be enough to showcase your experience.
- Only use an external library for styling, try to implement the functionality yourself
- It would be nice to see any experience you might have with testing and type-checkers.
- If you have any questions, reach out, we’d love to hear from you!

## How to run

### Install dependencies

`npm install`

### Run the app

`npm run dev`

## Things I would have liked to add

- Retry mechanism for API requests
- Handle errors more gracefully than displaying "Something went wrong :(" which replaces the grid.
- Improve the looks of the tiles
- Improve the looks of the loading indication when a (new) page is being loaded.
- Handle loading of images, especially since the images are very big.
- Safely decode unescaped characters in response strings.
- Make search input case-insensitive.
- In `useProducts.tsx`, separate the query logic from products by creating `useInfiniteFetch.tsx` hook that can be used by `useProducts.tsx` and other future request hooks.
- Hide MSW warnings in console.
- Write more tests, especially for edge cases / error handling and pagination.
- Improve usability of search box.
- Remove "?search=" from URL after a search is removed.
- Add loading skeletons to improve perceived performance (also for images).

And probably lots of other things I can't think of right now :)

## Notes

### Dependencies that I have used (even though it wasn't allowed)

The assignment stated that it wasn't allowed to use any dependencies other than for styling. I have still made use of a few dependencies. I'll explain myself below:

#### MSW

I added MSW since it allowed me to create an implementation that is a bit closer to a real-world implementation. Besides that, I use it to mock the requests for the tests.

#### React-Router

I went a bit overboard and included routing to the app even though it wasn't part of the assignment. The reason for that is that I reused a little app/boilerplate that I made a while ago which contained routing. I decided to keep it since most apps have routing and therefore it might be relevant for an assignment like this.

#### uuid

I could have added my own function that generates a UUID, but since using a library is usually a preferred option for UUID generation, both from a maintainability and secury perspective, I decided to make use of this library.

### Dependencies I would have liked to use

#### React-Query

Normally I would have used React Query (Tanstack) for the requests rather than writing my own request logic. It has lots of useful features like caching and a retry mechanism, and results in less code to maintain.
