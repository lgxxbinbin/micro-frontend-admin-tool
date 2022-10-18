# Shared App Shell, State, Routing and Components Example

This example demos a basic host application loading remote component.

- `shell` is the App Container
- `dashboard` - standalone application
- `order` - standalone application
- `auth` - standalone application
- `store` - standalone application
- `widget` - standalone application

# Running Demo

Run the following commands:

1. `yarn install`
2. `yarn setup`

To run the applicatio, run `yarn start`. This will build all the apps `shell`, `dashboard`, `order`, `auth`, `store`, `widget` on different ports as shown below

- [localhost:6001](http://localhost:6001/) (HOST) - `shell`
- [localhost:6100](http://localhost:6100/) (STANDALONE REMOTE) - `dashboard`
- [localhost:6200](http://localhost:6200/) (STANDALONE REMOTE) - `order`
- [localhost:6300](http://localhost:6300/) (STANDALONE REMOTE) - `auth`
- [localhost:6400](http://localhost:6400/) (STANDALONE REMOTE) - `widget`
- [localhost:6500](http://localhost:6500/) (STANDALONE REMOTE) - `store`

But We use proxy to customize the domain host app to prevent CORS policy.
Proxy using localhost:3000/ to forward all the request to others

In browser open [http://localhost:3000] to enter the application with username and password:

- Admin role
  id/password: admin/123

- Dev role
  id/password: dev/123

- User role
  id/password: user/123
