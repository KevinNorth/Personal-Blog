# README

My personal website at kevinnorth.dev. A simple blogging platform built on top of Rails, React, and GraphQL.

# Project Organization

## Backend

This app uses Rails and the usual directory structure that comes with it for its backend. It also uses:

- [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) for GraphQL
- [Devise](https://github.com/heartcombo/devise) for authentication
- [jsbundling-rails](https://github.com/rails/jsbundling-rails) for including the frontend bits in the asset pipeline
- [rspec-rails](https://github.com/rspec/rspec-rails) and [factory-bot-rails](https://github.com/thoughtbot/factory_bot_rails) for testing

Tests are in the `spec` directory, and GraphQL bits are in `app/graphql`.

## Frontend

This project uses TypeScript and [React](https://react.dev/) compiled with [WebPack](https://webpack.js.org/) and [Babel](https://babeljs.io/). The frontend code lives in `app/javascript` (because this is where the jsbundling-rails gem prefers to look for it). The Sass stylesheets are in `app/assets/stylesheets`.

Other important dependencies include:

- [graphql](https://github.com/graphql/graphql-js) and [@apollo/client](https://www.apollographql.com/docs/react/) for GraphQL.
- [react-bootstrap](https://react-bootstrap.netlify.app/) to use Bootstrap.
- [react-markdown](https://github.com/remarkjs/react-markdown) to render Markdown to the DOM.
- [react-router-dom](https://reactrouter.com/en/main) for navigation.
- [jest](https://jestjs.io/) for tests.

There are two entry points to the TS app:

- `app/javascript/blog.tsx` renders the root React component for displaying posts to site visitors.
- `app/javascript/admin.tsx` provides Markdown editors for me to write and edit posts to the site.

The `app/javascript` directory is organized like this:

- `components`: React components.
  - `components/admin`: Components specific to the admin editors.
  - `components/blog`: Components specific to reading posts.
  - `components/common`: Components shared by both parts of the app.
- `graphql`: Bits for sending GraphQL queries and mutations.
- `hooks`: Custom React hooks.
- `lib`: Miscellaneous, straigtforward code that didn't fit anywhere else.
- `transforms`: Functions that massage raw GraphQL queries into data structures that React components can consume more easily.
- `types`: TypeScript types that don't belong closely to specific bits elsewhere.

## To Do

I decided to focus on getting my website live quickly so I could link to it - and this repo - on my LinkedIn profile. As a result, I accrued a bit of tech debt. Here are the things I'm planning on cleaning up soon:

- [ ] Add more tests to gain near-full code coverage. (In progress: https://github.com/KevinNorth/Personal-Blog/pull/13)
- [x] Clean up the CSS on the admin editor so it's easier to use. (https://github.com/KevinNorth/Personal-Blog/pull/12)
- [ ] Handle errors on both the frontend and the backend more gracefully.
- [ ] Shore up the validation logic on models.
- [ ] Refactor posts and categories into one model. I thought they'd be more different from each other when I started this project, but in retrospect, I only need posts with unique URL slugs on my site.
- [ ] Clean up the number of configuration files in the repository's root directory.

When I'm caught up on tech debt, there are a couple more features I'm planning to add:

- [ ] Use ActiveStorage to upload images for each category and post, allowing them to show different header images on each page.
  - I'd like to include thumbnail images on the cards for posts as well.
- [ ] Add a post tag system so I can tag posts and categories with the technologies I used for each project.
- [ ] Use Webpack's `SplitChunksPlugin` to avoid serving one large JS payload. https://webpack.js.org/plugins/split-chunks-plugin/
- [ ] Switch from jsbundling-rails to [Shakapacker](https://github.com/shakacode/shakapacker) and set up hot reloading in my dev environment.

## Creating a development environment

### GitHub Codespace (recommended)

I have configured my dev environment to work out-of-the-box with [GitHub Codespaces](https://docs.github.com/en/codespaces/overview). Go to [the landing page for this repository](https://github.com/KevinNorth/Personal-Blog) and click the green "Code" button above the list of files to get started!

### Docker Dev Container

You can also use [VS Code with Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) to open this repository in a Docker container. Once the container is up and running and the initial `setup.sh` script completes, you should be good to go.

### Developing without Docker

I haven't tried working on this project without a Docker container, so I don't recommend trying to do so. But if you want to, here are the setup steps that the Docker container goes through when it set itself up:

1.  Install [RVM](https://rvm.io/) and Ruby 3.2.2.
2.  `gem install bundler`
3.  Install Postgres and the Postgres development libraries. On Ubuntu, this is `apt-get install postgresql-client libpq-dev`.
4.  Install [NVM](https://github.com/nvm-sh/nvm) and Node 20.8.0.
5.  Run `setup.sh`. This will create your Rails database, install pnpm (my preferred Node package manager for this project), install dependencies, and build the frontend.

## Developing in this repo

### Prepare the databsae

`rake db:seed` populates the database with an initial user and some categories and posts. This is run for you if you run `setup.sh` or use a Docker dev container.

If you don't use `rake db:seed`, there are two Rake tasks to help you get your database set up:

- `rake new_instance:create_initial_categories` adds two categories to the database. These two categories are expected to be present by the 404 page.
- `rake "auth:create_user\[Full Name, login\]"` adds a user to the database. You will be prompted to enter a password for the user when you run this command.

### Run the server

Run `rails s -b '0.0.0.0'` to start the backend. Since I'm using `jsbundling-rails`, this serves the frontend too. Go to `127.0.0.1:3000` to visit your local copy of the site. (This works out-of-the-box with Codespaces!)

Go to `127.0.0.1:3000/auth/login` to access the admin panels. If you're using the data created by `rake db:seed`, the username is `kevin` and the password is `12345`.

### Build the frontend

You can run the build script with either:

- `rails assets:precompile`
- `pnpm run build:dev`

You can also build the frontend in Webpack's production mode with `pnpm run build`.

### Run tests

To run backend tests, run `rspec`. To run frontend tests, run `pnpm run test`.

### Linting

To lint the backend, run `rubocop`. `brakeman` and `bundler-audit` are also available and are run as part of the CI pipeline.

To lint the frontend, run `pnpm run lint`. To format frontend code via Prettier, run `pnpm run format`.

### Deploying

I'm hosting my website on [Render](https://render.com/). Render is configured to automatically deploy whenever there are changes to main published to GitHub in this repository.

My deployment manifest is [`render.yaml`](https://github.com/KevinNorth/Personal-Blog/blob/main/render.yaml) in the repo's root directory. You can use it to [deploy your own instance to Render](https://render.com/docs/deploy-rails). After deploying, [run the commands to menaully set up the initial categories and admin user](#prepare-the-databsae).

### VS Code recommended

If you use the Docker dev container, I have it configured to install several helpful VS Code extensions when you open it. So I recommend using VS Code with either Codespaces or Docker for development.

The extensions are:

- [ruby-rubocop](https://marketplace.visualstudio.com/items?itemName=misogi.ruby-rubocop): Uses Rubocop to lint Ruby as you code.
- [GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) and [Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax): Provide syntax highlighting and autocomplete for GraphQL in the frontend.
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers): Integrates the Docker dev environment with VS Code.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Uses ESLint to lint TypeScript as you code.
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint): Formats TypeScript on save.
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented): Formats, autocompletes, and syntax highlights Sass.

### About `credentials.yml.enc`

As currently recommended, I use `credentials.yml.enc` to store secrets in my project. I have the master key configured as an environment variable on the deploy server, my personal Codespace instance, and the Github Actions pipeline. But it isn't available in the Codespace or Docker container by default.

As a result, any Rails commands you run with `RAILS_ENV=production` will fail. You will need to use `rails credentials:edit` to reset the master key in your instance if you wish to do so. If you do this, please do not open MRs and include changes to `credentials.yml.enc` to avoid blowing away the copy that works with my master key. (I'm not expecting MRs for my personal website, but if for some reason you care to open one, now you know!)
