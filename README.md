## Project description

The following project is a test developed for the company S'nce. It is a Pokémon-themed web application that simulates user access as a trainer. The trainer can add Pokémon teams, modify them, and view a list of its teams, which can be filtered by Pokémon abilities and types. The project utilizes the PokeAPI to retrieve Pokémon data.

[Assigned exercise](https://docs.google.com/document/d/1oiJKRK2ReXyzn2JTYgqO-KEGkSvpeRl-DA2pA4_1DJk/edit)

## Technologies Used

- [Node.js](https://nodejs.org/en)
- [Next.js](https://nextjs.org/) 13.4.7 [with app router](https://nextjs.org/docs/app)
- [Prisma](https://www.prisma.io/) (ORM)
- [Docker](https://www.docker.com/) (with Dockerfile)
- [Docker Compose v3.9](https://docs.docker.com/compose/compose-file/compose-file-v3/)
- [PostgreSQL 14.8](https://www.postgresql.org/)

## Initial Considerations

Here are some additional considerations regarding the project:

- The project Frontend part is visually imperfect and incomplete. Due to timing constraint all the Frontend feature have been developed except the styling and a advanced UI part. The required frontend routes are available.
- The project utilizes the public PokeAPI for retrieving Pokémon data. However, please note that the availability and reliability of the API may affect the project's functionality.
- To simplify the instructions, .env file has been pushed to the repo even if it's not a best practice.
- The database diagram for the implemented solution is:
  ![db](/docs/db_diagram.png)

## Prerequisites

Before getting started, make sure you have the following dependencies installed:

- Docker
- Docker Compose v3
- Node.js v18
- [NPM package manager](https://www.npmjs.com/)

## Installation

1. Clone the repository from GitHub:

   ```bash
   git clone git@github.com:GiuGeraci/poke-snce.git
   ```

2. Go to root folder and install dependencies using npm
   ```bash
   npm install
   ```
3. Run docker compose command to containerize application and db
   ```bash
   docker compose up #or docker-compose up
   ```
4. In another terminal check the webapp container id by searching in the active container list
   ```bash
   docker ps
   ```
5. Enter the container
   ```bash
   docker exec -ti <container_id> sh
   ```
6. Run the command to setting up db
   ```bash
   npx prisma migrate dev --name init
   ```
7. Run the command to populate the db with the mocked current logged trainer

   ```bash
   npm run db:seed
   ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Final considerations and future evolution

1. As anticipated before, the Frontend part can be enhanced and visually rebuilt.
2. Pokemon are saved in the db as instance of Pokemon to enable in future possibilities like: pokemon upgrade, pokemon exchange between trainer.
3. Add the trainer CRUD and auth strategy
4. Add an admin role and dashboard to supervise trainer actions.
