### ASSUMPTIONS AND LIMTATIONS

- The application only allows users to draw two rectangles at any given time. Users must save or
  clear the current rectangles before drawing additional ones.
- The canvas is fixed to a width of 800px and height of 600px. If the content exceeds the canvas, it
  will not be scaled.
- The saved data is stored in the browser's local storage. This means if the user clears their
  browser cache or switches devices, the data will be lost.
- The app has basic responsiveness. While the table can scroll horizontally on smaller screens, the
  layout might not be fully optimized for very small screen sizes.
-

### STEPS TO RUN THE WEB APPLICATION

- git clone [Medala assessment](https://github.com/obodobright/medalla-assement.git).
- cd medalla-assement
- install npm dependencies - npm i
- run the application - npm start

### WEB APPLICATION FEATURE

- Draw Rectangles
- Save Rectangles
- Clear the canvas
- View saved data
- Sort and delete saved records
- Rerender saved rectangles - This is render in the second screen of `View Rectangle screen`

### TECHNOLOGIES USED

- React - User interface
- TypeScript - for type safety
- CSS (For styling and responsive design)
- Local Storage (For saving the measurement data)
- HTML5 Canvas (For drawing Rectangles)
