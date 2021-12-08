<h1 align="center">💉 shoehorn PATUCO 💉</h1>

# <br>Styles:

Quickly design and customize responsive websites just like you would with Bootstrap.
You can create css styles, css variables, animations, media queries among other options and save them to use them in any project.
When your project is ready, you can create an optimized css file with only the styles you have used.

# <br>Layouts:

Import and export components, views, models or whatever you need ...
You can save templates with the directories and files you need to quickly start projects or reuse files.
You can save templates with code to inject it into any file.


# <br>Quick start:
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

### Index

<table>
  <tr>
    <td valign="top">
      <ul>
        <li><a href="#view_and_edit_classes">View_And_Edit_Classes</a></li>
        <ul>
          <li><a href="#Search_By_Class_Or_Property_Name">Search_By_Class_Or_Property_Name</a></li>
        </ul>
        <li><a href="#Create_Classes">Create_Classes</a></li>
        <ul>
          <li><a href="#Add_A_New_Class">Add_A_New_Class</a></li>
          <li><a href="#ClassName">ClassName</a></li>
          <li><a href="#ChildCombinator">ChildCombinator</a></li>
          <li><a href="#PseudoClass">PseudoClass</a></li>
          <li><a href="#Properties">Properties</a></li>
          <li><a href="#Variables-In-Properties">Variables-In-Properties</a></li>
          <li><a href="#Typical-CSS-variables">- Typical-CSS-variables</a></li>
          <li><a href="#Add_CSS">Add_CSS</a></li>
          <li><a href="#Recurring-CSS-variables">- Recurring-CSS-variables</a></li>
          <li><a href="#Patuco-variables">- Patuco-variables</a></li>
          <li><a href="#presentationcontrols">PresentationControls</a></li>
        </ul>
        <li><a href="#abstractions">Abstractions</a></li>
        <ul>
          <li><a href="#image">Image</a></li>
          <li><a href="#text">Text</a></li>
          <li><a href="#line">Line</a></li>
          <li><a href="#quadraticbezierline">QuadraticBezierLine</a></li>
          <li><a href="#cubicbezierline">CubicBezierLine</a></li>
          <li><a href="#positionalaudio">PositionalAudio</a></li>
          <li><a href="#billboard">Billboard</a></li>
          <li><a href="#gizmohelper">GizmoHelper</a></li>
          <li><a href="#effects">Effects</a></li>
          <li><a href="#gradienttexture">GradientTexture</a></li>
          <li><a href="#useanimations">useAnimations</a></li>
        </ul>
        <li><a href="#shaders">Shaders</a></li>
        <ul>
          <li><a href="#meshreflectormaterial">MeshReflectorMaterial</a></li>
          <li><a href="#meshwobblematerial">MeshWobbleMaterial</a></li>
          <li><a href="#meshdistortmaterial">MeshDistortMaterial</a></li>
          <li><a href="#pointmaterial">PointMaterial</a></li>
          <li><a href="#softshadows">softShadows</a></li>
          <li><a href="#shadermaterial">shaderMaterial</a></li>
        </ul>
        <li><a href="#modifiers">Modifiers</a></li>
        <ul>
          <li><a href="#curvemodifier">CurveModifier</a></li>
          <li><a href="#useedgesplit">useEdgeSplit</a></li>
          <li><a href="#usetessellation">useTessellation</a></li>
          <li><a href="#usesimplification">useSimplification</a></li>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#misc">Misc</a></li>
        <ul>
          <li><a href="#html">Html</a></li>
          <li><a href="#cycleraycast">CycleRaycast</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#usedepthbuffer">useDepthBuffer</a></li>
          <li><a href="#usecontextbridge">useContextBridge</a></li>
          <li><a href="#usefbo">useFBO</a></li>
          <li><a href="#usecamera">useCamera</a></li>
          <li><a href="#usedetectgpu">useDetectGPU</a></li>
          <li><a href="#usehelper">useHelper</a></li>
          <li><a href="#useaspect">useAspect</a></li>
          <li><a href="#usecursor">useCursor</a></li>
          <li><a href="#useintersect">useIntersect</a></li>
        </ul>
        <li><a href="#loading">Loaders</a></li>
        <ul>
          <li><a href="#loader">Loader</a></li>
          <li><a href="#useprogress">useProgress</a></li>
          <li><a href="#usegltf">useGLTF</a></li>
          <li><a href="#usefbx">useFBX</a></li>
          <li><a href="#usetexture">useTexture</a></li>
          <li><a href="#usecubetexture">useCubeTexture</a></li>
        </ul>
        <li><a href="#performance">Performance</a></li>
        <ul>
          <li><a href="#instances">Instances</a></li>
          <li><a href="#merged">Merged</a></li>
          <li><a href="#points">Points</a></li>
          <li><a href="#segments">Segments</a></li>
          <li><a href="#detailed">Detailed</a></li>
          <li><a href="#preload">Preload</a></li>
          <li><a href="#bakeshadows">BakeShadows</a></li>
          <li><a href="#meshbounds">meshBounds</a></li>
          <li><a href="#adaptivedpr">AdaptiveDpr</a></li>
          <li><a href="#adaptiveevents">AdaptiveEvents</a></li>
          <li><a href="#usebvh">useBVH</a></li>
        </ul>
      </ul>
    </td>
  </tr>
</table>

# <br><p align="center">Styles</p>

## <br>View_And_Edit_Classes

<br>You can see all the predefined classes and the new classes that have been created, organized by collections.
You can also search for classes.

### <br>Search_By_Class_Or_Property_Name

You can enter any character that may be contained in the name of a class, a property or the value of a property, to find the information of the classes that are stored. If you select the 'search' option and don't enter a value, all classes will be printed in the terminal.

## <br>Create_Classes

<br>You can create new classes and store them to use in different projects.

### <br>ClassName

First you have to enter the name of the class. Class names must be preceded by _ . If you don't enter _ in front of the class name it will be added automatically, remember this when you have to use the class.

### <br>ChildCombinator

The next thing you will be required to do is enter the children the class will have an effect on, such as 'h1' 'div> span'. You can enter anything you need, the important thing is that you are clear about the placement in which the class name will end up organized, it will be something like ._classname + Child combinator + pseudoclasses / pseudoelements_. It is not mandatory to enter any value.

### <br>Properties

Next you will be asked to introduce a pseudo class such as _hover_. If you enter a value it will be added to the end of the class name resulting in ._classname + Child combinator + pseudoclass_. You can enter any value, it does not necessarily have to be a pseudo-class, the important thing is how the name will be constructed. It is not mandatory to enter a value.

### <br>Properties

Now it's time to add the properties of the classes. You just have to go and enter the property name and value in this way _display: flex_. When you have finished adding properties select the option to continue.

### <br>Variables-In-Properties

You can add three types of variables to your classes:

- Typical CSS variables: You can add any variable that you have previously configured in the section to configure variables.
- Recurring CSS variables: They make the classes repeat as many times as recurring css variables exist in their name. They are used to repeat classes without having to write a lot of code.
- Patuco variables: These are variables that are stored in collections in case you need to use them in different projects. They have the special feature that you can use javascript functions to calculate their value and nest typical CSS variables.

### <br>Typical-CSS-variables

Create and configure CSS variables in the section to configure variables and add them to your properties like this: _property: var (--variablename)_ such as: _margin: var (--spacer)_

### <br>Recurring-CSS-variables

These variables indicate when updating the schema.css file that the class has to be repeated as many times as there are recursive variables with that name.

The name of the variables must end with  \_- + number just like \_-0. An example of a full name would be: \_spacer_-0 and if for example there are 3 variables stored with the names _spacer\_-0, spacer\_-1, spacer\_-2_, When updating the schema.css file, the class would be repeated three times with the values ​​corresponding to those variables.

To the names of the classes the last part of the variable name will be added at the end. If the class is called for example _m_, in the previous example there would be three classes with the names _m0, m1, m2._

If the name of the variable contains the characters -k- + something, such as _spacer-k-s\_-0_ when updating the schema.css file it will be added to the name of the class, the characters that are between -K- and \_-0. If for example there are three variables with the names _spacer-k-s\_-0, spacer-k-s\_-1, spacer-k-s\_-2_ the names of the classes would remain for the name _m_: _m0s, m1s, m2s._

Recurring variables are added as an array to properties, so you can add as many recurring variables to a CSS property as you want.

The only thing you have to keep in mind is that if you have to use recurring variables in different properties, they always have to be the same, otherwise an error will occur, since if they are not the same variables the result would be a lot of repeated classes and a chaos of class names.

Another detail to keep in mind when adding more than one recursive variable to a property is to mark the variable's name with -k- + id to have unique class names.

Example of how to add a recurring variable to a CSS property. Important! notice how the variable name is wrapped by the | character:
_margin:_ var (| spacer_-0 |)

If you want to add more than one recurring variable to a property, you just have to separate them by commas:
_margin:_ var(|spacer_-0, spacer-K-s_-0|)

### <br>Patuco-variables

### <br>Add_CSS
