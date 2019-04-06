# dps-palette-generator
A color palette generator in react

The UI uses React.js, as a simple example of basic using.
It's allow selecting a photo and locally(using Web Workers) calculates the 10 most representative colors.
It works positioning all the pixels of the image in a x,y,z space using its RGB components. After that, divides de 3d space in equal parts, called buckets.
Finally it selects the 10 most populates buckets and calculates each bucket average color.
