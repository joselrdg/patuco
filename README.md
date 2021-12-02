<h1 align="center">💉 shoehorn PATUCO   </h1>

# <br>Styles:

Quickly design and customize responsive websites just like you would with Bootstrap.
You can create css styles, css variables, animations, media queries among other options and save them to use them in any project.
When your project is ready, you can create an optimized css file with only the styles you have used.

# <br>Layouts:

Import and export components, views, models or whatever you need ...
You can save templates with the directories and files you need to quickly start projects or reuse files.
You can save templates with code to inject it into any file.

<br><br><img align="left" src="https://media.giphy.com/media/ObNTw8Uzwy6KQ/giphy.gif" width="30px">&nbsp;**_If you want to try it before it's ready..._**

1. Clone the repo
   ```sh
   git clone https://github.com/joselrdg/patuco.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create symbolic link in global folder:
   ```sh
   npm link (in package dir)
   ```
4. Start CLI patuco:
   ```sh
   patuco
   ```

# <br>Quick start:

Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS.

In HTML:

```sh
   <link rel="stylesheet" type="text/css" href="patucostrap/style/patucoSchema.css" media="screen" />
```

In JSX:

```sh
  import "patucostrap/style/patucoSchema.css"
```

Type in the terminal. In your project directory:

```sh
patuco
```

Save the path where the patuco module is located, configure the path where you want to save your templates and configure the language.

Save the path to the file 'patucoConfig.js':

```sh
/home/tuNombre/.nvm/versions/node/v16.2.0/lib/node_modules/patucostrap/src/scripts/constants/patucoConfig.js
```

![ScreenShot Patuco](./screenShot/settings.png)
![ScreenShot Patuco](./screenShot/settings2.png)

Now you can see the classes that "patuco" has or create new styles to incorporate them into your projects.

![ScreenShot Patuco](./screenShot/styles.png)
![ScreenShot Patuco](./screenShot/styles2.png)

Import and export components, views, models or whatever you need...

![ScreenShot Patuco](./screenShot/templates.png)
