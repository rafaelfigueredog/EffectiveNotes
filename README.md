# Welcome to Efective Notes

Effective Notes is a simple web project to manage note cards. It is my first project using JavaScript, ReactJs, Material UI, and JsonServer as mock Databases. 

![](https://github.com/rafaelfigueredog/effectiveNotes/blob/main/screenshot.png?raw=true)


# Usage 

[effectivenotes.app](https://effectivenotes.app) 

# Usage on local server.

**Front End**
```console
$ git clone https://github.com/rafaelfigueredog/effectiveNotes.git
$ cd effectiveNotes 
$ yarn install 
$ yarn start 
```

**Back end**

Open a second instance of the terminal and go to the repository folder, run the following command: 
```console
$ json-server --watch src/database/db.json --port 8000
```

## Features

- Create a Note
- Delete Note
- Update the color note
- Dark Theme
- Dynamic form for create notes 

## Future features

- Create category for notes. 
- Edit an existent note

## Licence
Effective Notes is [MIT licensed](https://github.com/rafaelfigueredog/effectiveNotes/blob/main/LICENSE).
