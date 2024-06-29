# Peanutgames - Rock Paper Scissors

The Rock Paper Scissors (RPS for short) is a multiplayer web-game, powered by a  
set of dedicated [RPS smart-contracts](https://github.com/GoPeanutGames/rps-solidity) developed by [Peanutgames](https://peanutgames.com) studio.

<br />
<br />

## Project structure

```
root
├─ public       # Contains static assets, not managed by Vite.
└─ src
   ├─ assets    # Assets used accross the project.
   │
   ├─ lib       # Contains independent re-usable package a-like modules (think
   │            # of `node_module` packages).
   │            #
   │            # A lib may use project level dependencies (ideally should have
   │            # all dependencies documented) but can't use other libs for
   │            # isolation / re-usability purposes.
   │            #
   │            # If required each lib should have its own set of unit tests.
   │
   ├─ feat      # Contains compositions of components from `lib` and external
   │            # packages. Ready to be used in views, may require additional
   │            # configuration through contexts or (rarely) props.
   │            #
   │            # Some features may rely on another, prefer adding a lib when
   │            # possible for maximum re-usability.
   │
   └─ routes    # Contains views composed of routing logic, feature components,
                # contexts and configs (where required).
```

<br />
<br />

## Deployment

### Local deployment & testing

Create the `env.local` file in the root directory with the following content:

```shell
VITE_WALLET_CONNECT_PROJECT_ID=
VITE_RPS_ROUTER_ADDRESS=
```

Run the following command to load dependencies:

```shell
docker compose run app /bin/sh -c "pnpm"
```

Once dependencies are installed, the following command would start the app in  
developer mode and expose it at `http://localhost:5173`:

```shell
docker compose up
```

<br />
<br />
<br />
<br />
