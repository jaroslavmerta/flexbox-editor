# flexbox-editor

Hey everyone,  
this is my little project I created to PRACTICE programming skills.  
The main idea I follow is "EDITOR" and I chose CSS technology Flexbox to demonstrate the main tasks involved in creating an editor and in creating any bigger project.
The result of this activity should not be just a product that does something, but rather the right programming techniques and their justification in a text form connected with a practical example as a part of larger whole.  

Download, try, look into codebase, criticize code techniques. You can fork and make some changes or just write me suggestions and I will try to apply them if they are worthy. 
My main part in this is to make description of used techniques including reflection of the changes.  

# what Flexbox-editor can do / how to control
The application allows you to add boxes and images. Boxes can contain items. Items can be additional boxes or images.
Items can be added, removed, positioned within their box, resized and moved from one box to another. 
The application is controlled via a menu that can be launched by clicking the left mouse button in the editor area (flat box on the top of the page). The menu is very similar to the menu from OS Microsoft Windows that you can open by clicking the right mouse button on desktop.

# what about the flexbox?
Css flexbox is main way that influences the behavior of the items. The idea is pretty same, here every box is actually flexbox, has the same features like flex-direction, justify-content, align-items... and the same way item is actually flex item and you can use its features like aling-self and flex-grow (here only for box).


# how to run
You need to have Node.js installed on your OS (my version of Node.js is v16.13.1 and it works fine). Clone the repository and run the command "npm run dev" in the console in the folder: flexbox-editor/client . Then you should see adress on which project is running. In your browser(Chrome, Firefox, Edge, Opera, updated to the latest version) type this adress, it should be: http://localhost:8080/ 

# technical desription
- programming language: Typescript
- programming paradigm: OOP
- styling method: CSS modules written  in Sass
- module bundler/task runner: Webpack
- database: Local storage (funny one, but yes, now it uses local storage, because it needs more advanced database design I am not capable of for now)


# logical structure (loading...)

Editor is made up from components:  
- Item (class contains functions that can be applied to all items)  
- BoxItem (class contains functions that affect only box item)  
- ImageItem (class contains functions that affect image item)  
- Main box (class contains functions that affect main box)  
- Menu (class contains functions that create components for menu like unordered lists with buttons, anchors inside, navList, "title div" for group of buttons etc.)
- FirstMenu ()

Menu  
event delegation  
objects

# apologize
I hope this list below will disappear very soon, because they are basic mistakes I did because I was too hungry to make things work as sooon as possible :-)
- add comments to functions that have no comments (character: lazy programmer)  
- remove functions that will not be used anymore  
- add basic desription of main parts of code  
- make better adresary tree like better names of files and sorting (When I started it was good and it made perfect sense, but things changed from then, but some names not)
- make better logical structure in Menu classes
- atomize functions where needed
