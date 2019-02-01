# What is this

A todo webapp that lets you plan tasks for the next few days. It stores the
tasks in the browser's localStorage, so you can safely close the website and reopen it later.

Technically it uses react for the ui, redux for data management and a custom webpack config for the file bundling.

I'm currently thinking of ways to expand this to function as general daily diary.
This would have a few "magic" advantages over paper:
* Interesting idea to combine todo-list & diary
* Never worry about structuring, not enough space, inserting stuff later
* Automatically generate summaries for the day / week

# How to use it

Simply visit `today.phgn.io`, build it yourself with `yarn build` and open `./dist/index.html`, or start a dev server with `yarn start`.
