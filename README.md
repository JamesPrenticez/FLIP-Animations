# FLIP Animations
This Repo stands as a reminder to be SMART
Yes you can build your on components but the are often janky if you dont have the time to account for all edge cases

USE A LIBRARY (provided you can find one)
react-flip-toolkit

It helps to know what you are looking for...

Who would've know FLIP stood for First Last Invert Play?!?

THIS => https://makersden.io/blog/flip-animation


https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value

Grid properties are not directly animatable.
To animate between them, you must save their visual state before the change (width, height, absolute position with regards to the viewport)
make the change to the properties, then animate from the saved values to the new values. This sort of transition commonly is called the FLIP technique.
Flip technique in React https://souporserious.com/build-a-simple-flip-animation-in-react/

## React Framer Motion
Drag Drop List - https://codesandbox.io/s/framer-motion-5-drag-to-reorder-lists-uonye?from-embed=&file=/src/App.tsx