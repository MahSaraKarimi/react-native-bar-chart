import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import BarChart from 'react-native-bar-chart';

export default function App() {
  // const data = [70, -10, 110, 80, 130];
  const data = [
    [70, -5],
    [80, -10],
    [110, 0],
    [100, 0],
    [280, -60],
  ];

  const horizontalData = ['April', 'May', 'June', 'July', 'August'];

  return (
    <View style={styles.container}>
      <BarChart data={data} horizontalData={horizontalData} prefix="$" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
