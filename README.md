# Gallery Job Application

This app is created for a job application for Careertown (http://careertown.com/). It's purpose is to create an AngularJS based Gallery. (see **Functionality**)

### Content

The following repository contains two versions of the app:

- **requires_server** - this version loads templates and uses the AngularJS **$resource** (which uses AJAX) module to load JSON resources. If this version of the app is directly executed (index.html) it will trigger a Cross Origin Request Browser error. (see **Instalation**)
- **inline_templates_resources** - this version has all it's templates inlined (via **ng-template**) and all resources hardcoded. It is by no means a production version, but it can be run withouth a server and with no installation. (**Note:** this version makes it a bit more troublesome to create new galleries as the stuff is harcoded).

### Instalation
- **requires_server** - to install this version you will need some kind of http server (tested on Apache). Clone the repo or copy the files to the a subdirectory of the server's working directory of your choice and access it through the server. (ex. http://localhost/gallery).
- **inline_templates_resources** - clone or copy the files wherever and run index.html.
- 
### Functionality

The app contains the following defined directives for the creation of a gallery:
- **galleryList** - creates a thumbnail list of the galleries based on the contents of */assets/resource/galleries.json*. The gallery object should look like this:
        
```javascript
[
    {
        "alias" : "nature", //Alias of the gallery used for generating links
        "title" : "Nature", //The title of the gallery
        "front" : "image_1.jpeg", //The front image of the gallery
        "storage" : 1 //Whether the image is in storage or it's a link to an outside resource
    }
]
```
- **galleryView** - This is the directive that generates the gallery. It creates a thumbnail listing of the gallery images based on the contents of */assets/resource/images/{{name_of_gallery}}.json* (see below). When clicking on a thumbnail, a modal is generated showcasing the title, description and tags of the image. This directive also provides filtering by tag name. By clicking on a tag you  can view only the images of the gallery that have this tag.
        
```javascript
[
    {
        "title" : "Shadow Guy", //Title of the image
        "description" : "A shadowy guy doing shadowy things in the shadows.", //Description of the image
        "storage" : 1, //Whether the image is self hosted or not
        "source" : "image_1.jpeg", //The image file/link
        "tags" : ["shadow", "guy", "sunset", "things"] //ALL THE TAGS
    },
    
    ...
]
```
- **galleryDetails** - This diective generates the details page with a card for each image in a gallery containing it's file source, title, description and tags. Clicking on any of the tags will show the **galleryView** for this tag.

### Creating a new gallery (on the require_server version)

- Step 1: Create an entry for the gallery in */assets/resource/galleries.json* (see **Functionality > galleryList**) 
- Step 2: Create a file named {{alias_of_the_gallery}}.json in */assets/resource/images/* (see **Functionality > galleryView**) 
- Step 3: Profit. (Could not resist)

### Creating a new gallery (on the inline_templates_resources version)

- Step 1: Create an entry for the gallery in **var galleriesResource** in */assets/js/directives/main.js*. It follows the same structure as the JSON you would use normally. (see **Functionality > galleryList**) 
- Step 2: Create a file named entry for the gallery images in **var imageResource** in */assets/js/directives/main.js*. The structure of that variable is as follows:
```javascript
var imageResource = {
    "{{gallery_alias}}" : [
        {
            "title" : "{{image_title}}",
            "description" : "{{image_description}}",
            "storage" : 1,
            "source" : "image_1.jpeg",
            "tags" : ["shadow", "guy", "sunset", "things"]
        },
        ...
    ],
    ...
}
```
- Step 3: No step 3. 