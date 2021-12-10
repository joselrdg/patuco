<h1 align="center">💉🩸 Shoehorn PATUCO  💉🩸</h1>

                         +               *
           *                    ___ _               +
                               |x  | |          
                   +           /x  | |     
                              /x  __)_)       +
          *               __./x /| / /
                         (_____/ |/|/                  *

# <br>Styles:

Quickly design and customize responsive websites just like you would with Bootstrap.
Apart from the styles that are pre-defined, you can create css styles, three types of variables that accept functions, animations, media queries among other options, and you can also store the styles to use them in any project.
When your project is ready, you can create an optimized CSS file with just the styles you have used.

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
    <link rel="stylesheet" type="text/css" href="/home/<yourName>/.nvm/versions/node/v<nodeVersion>/lib/node_modules/patucostrap/style/patucoSchema.css" media="screen" />
```

In JSX:

```sh
  import "/home/<yourName>/.nvm/versions/node/v<nodeVersion>/lib/node_modules/patucostrap/style/patucoSchema.css"
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

<table align="center">
  <tr>
    <td valign="top">
      <h3>Styles</h3>
      <ul>
        <li><a href="#view_and_edit_classes">View_And_Edit_Classes</a></li>
        <ul>
          <li><a href="#Search_By_Class_Or_Property_Name">Search_By_Class_Or_Property_Name</a></li>
        </ul>
        <li><a href="#Create_Classes">Create_Classes</a></li>
        <ul>
          <li><a href="#Add_A_New_Class">Add_A_New_Class</a></li>
          <li><a href="#ClassName">- ClassName</a></li>
          <li><a href="#ChildCombinator">- ChildCombinator</a></li>
          <li><a href="#PseudoClass">- PseudoClass</a></li>
          <li><a href="#Properties">- Properties</a></li>
          <li><a href="#Variables-In-Properties">Variables-In-Properties</a></li>
          <li><a href="#Typical-CSS-variables">- Typical-CSS-variables</a></li>
          <li><a href="#Recurring-CSS-variables">- Recurring-CSS-variables</a></li>
          <li><a href="#Patuco-variables">- Patuco-variables</a></li>
          <li><a href="#Add-psudo-element">- Add-psudo-element</a></li>
          <li><a href="#Create-animation-property">- Create-animation-property</a></li>
          <li><a href="#Add_CSS">Add_CSS</a></li>
          <li><a href="#Stores-styles">Stores-styles</a></li>
        </ul>
        <li><a href="#Set_Variables">Set_Variables</a></li>
        <ul>
          <!-- <li><a href="#image">Image</a></li> -->
        </ul>
        <li><a href="#Set_Animations">Set_Animations</a></li>
        <ul>
          <!-- <li><a href="#meshreflectormaterial">MeshReflectorMaterial</a></li> -->
        </ul>
        <li><a href="#Set_Media_Queries">Set_Media_Queries</a></li>
        <ul>
          <!-- <li><a href="#curvemodifier">CurveModifier</a></li> -->
        </ul>
         <li><a href="#Update_CSS_template">Update_CSS_template</a></li>
        <ul>
          <!-- <li><a href="#curvemodifier">CurveModifier</a></li> -->
        </ul>
         <li><a href="#Create_CSS_File_In_Your_Project">Create_CSS_File_In_Your_Project</a></li>
        <ul>
          <!-- <li><a href="#curvemodifier">CurveModifier</a></li> -->
        </ul>
      </ul>
    </td>
    <td valign="top">
    <h3>Templates</h3>
      <ul>
        <li><a href="#Templates">Templates</a></li>
        <ul>
          <!-- <li><a href="#html">Html</a></li> -->
        </ul>
        <li><a href="#Create_A_New_Album">Create_A_New_Album</a></li>
        <ul>
          <!-- <li><a href="#loader">Loader</a></li> -->
        </ul>
          <li><a href="#Create_Directory">Create_Directory</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
        <li><a href="#Layouts_Patuco">Layouts_Patuco</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
         <li><a href="#Layouts_User">Layouts_User</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
          <li><a href="#Import">Import</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
          <li><a href="#Export">Export</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
          <li><a href="#Inject_Components">Inject_Components</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
          <li><a href="#Inject_Components">Inject_Components_Automatically</a></li>
        <ul>
          <!-- <li><a href="#instances">Instances</a></li> -->
        </ul>
      </ul>
    </td>
  </tr>
</table>

<!-- # <br><p align="center">Styles</p> -->

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

### <br>PseudoClass

Next you will be asked to introduce a pseudo-class such as _hover_. If you enter a value it will be added to the end of the class name resulting in ._classname + Child combinator + pseudoclass_. You can enter any value, it does not necessarily have to be a pseudo-class, the important is how the name will be constructed. It is not mandatory to enter a value.

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

The name of the variables must end with \_- + number just like \_-0. An example of a full name would be: \_spacer-0 and if for example there are 3 variables stored with the names \_spacer\_-0, spacer\_-1, spacer\_-2, When updating the schema.css file, the class would be repeated three times with the values ​​corresponding to those variables.

To the names of the classes the last part of the variable name will be added at the end. If the class is called for example _m_, in the previous example there would be three classes with the names _m0, m1, m2._

If the name of the variable contains the characters -k- + something, such as _spacer-k-s\_-0_ when updating the schema.css file it will be added to the name of the class, the characters that are between -K- and \_-0. If for example there are three variables with the names _spacer-k-s\_-0, spacer-k-s\_-1, spacer-k-s\_-2_ the names of the classes would remain for the name _m_: _m0s, m1s, m2s._

Recurring variables are added as an array to properties, so you can add as many recurring variables to a CSS property as you want.

The only thing you have to keep in mind is that if you have to use recurring variables in different properties, they always have to be the same, otherwise an error will occur, since if they are not the same variables the result would be a lot of repeated classes and a chaos of class names.

Another detail to keep in mind when adding more than one recursive variable to a property is to mark the variable's name with -k- + id to have unique class names.

Example of how to add a recurring variable to a CSS property. Important! notice how the variable name is wrapped by the | character:
_margin:_ var (| spacer\_-0 |)

If you want to add more than one recurring variable to a property, you just have to separate them by commas:
_margin:_ var(|spacer-0, spacer-K-s-0|)

### <br>Patuco-variables

You can store collections of variables with any value type, including javascript functions, to add to css properties. They will be stored in a javascript object.

To write the variables in the properties of your classes, you must indicate the requested data between double parentheses as indicated below:

background: linear-gradient (to bottom right, ((_cVP, store, example, colors-primary)), ((\_cVP, lighter, example, ((_ cVP, store, example, colors-primary)), 20))) "

Let's just analyze the variable:

((\_cVP, store, example, colors-primary))

It is equivalent to:

((Function group, Action, Variable collection, Keys: parent-child, Props))

- Group of functions (\_cVP): indicates to which collection of functions the data is requested. At the moment there is only \_cVP. \_cVP contains functions to request the values ​​of variables and functions to modify colors.

- Action (store): It is the action that you want to be triggered. It is related to the collection of functions, since it indicates which function to use. At the moment the actions that can be requested are:

  - store: Returns the values ​​stored in the patuco variables.
  - darker: Returns a darker color than the one sent to it. You can send a color directly by adding it to the Keys parameter, or by adding a typical CSS variable to the keys parameter, or by adding a patuco variable to the Keys parameter.
  - lighter: Same as the previous one but returns a lighter color.
  - contrastYiq: Returns the color with the highest contrast.

- Variable collection (example): Name of the variable collection.

- Keys (colors-primary): In the action (store) this parameter is used to introduce the keys of the object where the patuco variables are stored. They are entered separated by -, to arrive at the stored values. The first value before - will indicate the parent's key, the next value after - will indicate the child's key, and so on. The values ​​will be taken from the collection indicated in the previous parameter. It is also used to send other types of values ​​to the functions, at the moment it is used to send colors to the rest of the functions of the \_cVP group.

- Props: This parameter is used to send the rest of the properties that the actions need. For example, in the case of the darker and lighter actions, a number would be entered to indicate the amount of dark or light colors you need.

<br>
You can nest patuco variables.

Let's analyze the following variable:

((_cVP, lighter, example, ((_ cVP, store, example, colors-primary)), 20))

- To nest variables you just have to add them between double parentheses.
- In the first variable, the name of the variable collection _example_ is useless but you have to add it.

<br>Examples of CSS properties with patuco variables:

_background: linear-gradient(to bottom right, ((\_cVP, store, example, colors-primary)), ((\_cVP, lighter, example,((\_cVP, store, example, colors-primary)), 20)))_

_box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem ((\_cVP, darker, example,((\_cVP, store, example, colors-primary)), 20)), .125rem .125rem 1rem ((\_cVP, lighter, example,((\_cVP, store, example, colors-primary)), 20))_

### <br>Add-psudo-element

You can add pseudo-elements like :: after or :: first-line, that will create the necessary classes with the corresponding name when updating the schema.css file or creating the optimized .css file for your project.

You can enter any value it does not necessarily have to be a pseudo-element. The important thing is that when updating or creating the .css file, additional classes will be created with the following structure in their name: ._classname + pseudoelements_.

You can add as many pseudo-elements as you want.
It is not mandatory to enter a value.

### <br>Create-animation-property

If you need it, enter the name and properties of some animation.

### <br>Add_CSS

If you want you can add pure CSS by selecting the Add CSS section. The first thing to do is enter a name to be able to identify it. Adding that name anywhere in your projects, when you create the optimized css file, the code you have entered will be injected. Note that the name is only to indicate to Patuco that it has to inject the code, but it is not the name of any class or CSS element.

The next thing you need to enter is the CSS code. Copy and paste or write CSS code as you would in a .css file. When you're done, update the templates.css file, so that the code is available in your projects.

### <br>Stores-styles

Finally save the style you have created. You can store them in existing collections, selecting the collection in the list that will appear in the terminal or you can create a new collection.
The collections will be saved in the directory indicated when configuring the Patuco package.

## <br>Set_Variables

## <br>Set_Animations

## <br>Set_Media_Queries

## <br>Update_CSS_template

## <br>Create_CSS_File_In_Your_Project

## <br>Templates

## <br>Create_A_New_Album

## <br>Create_Directory

## <br>Layouts_Patuco

## <br>Layouts_User

## <br>Import

## <br>Export

## <br>Inject_Components

## <br>Inject_Components_Automatically
