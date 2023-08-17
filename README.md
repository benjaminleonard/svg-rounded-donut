# SVG Donut Sector Library

1. [Installation](#installation)
2. [Usage](#usage)
   - [React Component](#react-component)
   - [Helper Function](#helper-function)
3. [API](#api)
4. [License](#license)

<img width="1200" alt="RoundedSector" src="https://github.com/benjaminleonard/svg-rounded-donut/assets/4020798/f27dc6df-7636-4c73-8bb5-ed795df7c2bb">

It give you donut sectors with rounded corners...

## Installation

To use the SVG Donut Sector library, simply import the package into your project:

```
npm install svg-rounded-donut
```

## Usage

### React Component

Use the `DonutSector` component to create a SVG donut sector directly in your React code.

```jsx
import { DonutSector } from "svg-rounded-donut";

const Donut = () => {
  const size = 640;
  const outerRadius = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
    >
      <g fill="grey" transform={`translate(${outerRadius} ${outerRadius})`}>
        <DonutSector
          angle={120}
          size={size}
          thickness={40}
          cornerRadius={4}
          color="red"
        />
      </g>
    </svg>
  );
};
```

### Helper Function

You can also use the `generateDonutSector` function to create a string representation of the SVG shape that you can use directly in your SVG code.

```js
import { generateDonutSector } from "svg-donut-sector";

// Then in your code...
const svgString = generateDonutSector({
  angle: 120,
  size: 200,
  thickness: 50,
  cornerRadius: 10,
  color: "#3498db",
});
```

## API

Both the DonutSector component and the generateDonutSector function accept the same props:

- `angle` _(number):_ Angle of the sector in degrees (between 0 and 360).
- `size` _(number):_ Diameter of the outer circle of the donut.
- `thickness` _(number):_ Thickness of the donut (the difference between the outer and inner radii).
- `cornerRadius` _(number | optional):_ Radius of the rounded corners. Default is 0 (no rounded corners).
- `color` _(string):_ Color of the donut sector.

## License

The SVG Donut Sector library is released under the MIT license.
