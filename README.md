# recursebooks
Library management tool for the Recurse Center's books.


Set-up

To run locally:

Database:
Download Postgres:  you can follow the instructions to download Postgres.app from postgresapp.com.
Open postgres (you can configure your bash profile to run from the command line)
Create a new database called recurse.

The app relies on environment variables.  These can be set in several ways:
1. Using bash profile:
From your home directory, open .bash_profile
export RECURSE_DB=<database name>
export RECURSE_DB_USERNAME=<username>
export RECURSE_DB_PASSWORD=<password>

If you don't want to change your bash profile, you can use autoenv, which allows you to use a directory-specific env file. (Put the export statements into a .env file in your project root).  Follow instrcutions on the github readme: https://github.com/kennethreitz/autoenv

Node Modules:
If you have npm, run 'npm install' from the project root to download required packages.

Build:

Starting the server:
'npm start' 

