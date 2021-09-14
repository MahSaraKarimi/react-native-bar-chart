# react-native-bar-chart

Bar chart for react native

## Installation

```sh
npm install react-native-bar-chart
```

## Usage

```js
import BarChart from 'react-native-bar-chart';

// ...

// data can be one or two dimensional Array
const data = [
  [70, -5],
  [80, -10],
  [110, 0],
  [100, 0],
  [280, -60],
];
// labels
const horizontalData = ['April', 'May', 'June', 'July', 'August'];

<BarChart data={data} horizontalData={horizontalData} />;
```

## Props

| Name            | Description                                                   | Required |
| --------------- | ------------------------------------------------------------- | -------- |
| data            | one or two dimensional array of numbers                       | true     |
| horizontalData  | array of string                                               | true     |
| backgroundColor | string for background color of chart                          | false    |
| barColor        | string for bar color                                          | false    |
| secondBarColor  | string for second bar color (if the array is two dimensional) | false    |
| height          | height of chart                                               | false    |
| prefix          | string for labels                                             | false    |
| suffix          | string for labels                                             | false    |
| barLabelColor   | string for color of text on top of the bar                    | false    |
| labelColor      | string for color of labels                                    | false    |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
