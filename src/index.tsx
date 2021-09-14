import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Dash from 'react-native-dash';

type DataSet = number[] | number[][];

type Props = {
  data: DataSet;
  horizontalData: string[];
  backgroundColor?: string;
  barColor?: string;
  secondBarColor?: string;
  height?: number;
  prefix?: string;
  suffix?: string;
  barLabelColor?: string;
  labelColor?: string;
};

const defaultHeight = Dimensions.get('window').height / 2.2;
let max = 0;

const VerticalLabel = ({ data }: { data: DataSet }) => {
  if (data[0].constructor === Array) {
    for (let i = 0; i < data.length; i++) {
      let tmpMax = Math.max(...(data[i] as []));
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
  } else {
    max = Math.max(...(data as []));
  }
  let label: number[] = computingVerticalLabels(max);
  return label.reverse();
};

const computingVerticalLabels = (max: number) => {
  let label = [];
  label.push(0);
  label.push(Math.round(max / 4));
  label.push(Math.round(max / 2));
  label.push(Math.round(max / 4 + max / 2));
  label.push(max);
  return label;
};

const HorizontalDots = ({
  labels,
  prefix,
  suffix,
  labelColor,
}: {
  labels: number[];
  prefix?: string;
  suffix?: string;
  labelColor?: string;
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingTop: 50,
        paddingBottom: 20,
      }}
    >
      {/* <View> */}
      {labels.map((item, index) => {
        const labelText = `${prefix || ''}${item}${suffix || ''}`;
        return (
          <View
            style={{
              height: `${100 / (labels.length - 1)}%`,
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 0.125 }}>
              <Text
                style={{
                  color: labelColor || '#D8D8D8',
                  marginTop: -10,
                  alignSelf: 'center',
                }}
              >
                {labelText}
              </Text>
            </View>
            <View style={{ flex: 0.875 }}>
              <Dash
                style={{ width: '100%', height: 1 }}
                dashGap={index === labels.length - 1 ? 0 : 2}
                dashLength={4}
                dashThickness={1}
                dashColor={labelColor || '#D8D8D8'}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const HorizontalLablesData = ({
  label,
  data,
  prefix,
  suffix,
  barColor,
  secondBarColor,
  barLabelColor,
  labelColor,
}: {
  label: string[];
  data: DataSet;
  prefix?: string;
  suffix?: string;
  barColor?: string;
  secondBarColor?: string;
  barLabelColor?: string;
  labelColor?: string;
}) => {
  const lenght = label.length;
  const width = 100 / lenght;
  return (
    <View style={{ position: 'absolute', bottom: 0, flex: 1, width: '100%' }}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={{ flex: 0.125 }} />
        <View
          style={{
            flex: 0.875,
            height: defaultHeight - 70,
            bottom: 1,
            flexDirection: 'row',
          }}
        >
          {label.map((_, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  width: `${width}%`,
                }}
              >
                {/* <Text>{item}</Text> */}
                {data[index].constructor === Array ? (
                  <>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: barLabelColor || '#383838',
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        {`${prefix || ''}${(data as number[][])[
                          index
                        ][0].toString()}${suffix || ''}`}
                      </Text>
                      <View
                        style={{
                          width: 15,
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          height: `${Math.round(
                            (Math.abs((data as number[][])[index][0]) / max) *
                              100
                          )}%`,
                          backgroundColor: barColor || '#FFD33D',
                        }}
                      />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          color: barLabelColor || '#383838',
                          fontSize: 12,
                          marginBottom: 5,
                        }}
                      >
                        {`${prefix || ''}${(data as number[][])[
                          index
                        ][1].toString()}${suffix || ''}`}
                      </Text>
                      <View
                        style={{
                          width: 15,
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          height: `${Math.round(
                            (Math.abs((data as number[][])[index][1]) / max) *
                              100
                          )}%`,
                          marginHorizontal: 5,
                          backgroundColor: secondBarColor || '#E64B38',
                        }}
                      />
                    </View>
                  </>
                ) : (
                  <View>
                    <Text
                      style={{
                        color: barLabelColor || '#383838',
                        fontSize: 11,
                        marginBottom: 5,
                      }}
                    >
                      {`${prefix || ''}${data[index].toString()}${
                        suffix || ''
                      }`}
                    </Text>
                    <View
                      style={{
                        width: 15,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        height: `${
                          (Math.abs(data[index] as number) / max) * 100
                        }%`,
                        backgroundColor:
                          data[index] < 0
                            ? secondBarColor || '#E64B38'
                            : barColor || '#FFD33D',
                      }}
                      key={index.toString()}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          bottom: 0,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
        }}
      >
        <View style={{ flex: 0.125 }} />
        <View
          style={{
            flex: 0.875,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            bottom: 0,
          }}
        >
          {label.map((item) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  width: `${width}%`,
                }}
              >
                <Text
                  style={{ color: labelColor || '#D8D8D8' }}
                  numberOfLines={1}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const BarChart = (props: Props) => {
  const verticalLabels = VerticalLabel({ data: props.data });
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor || 'transparent',
        width: '100%',
        height: props.height || defaultHeight,
      }}
    >
      <HorizontalDots
        labels={verticalLabels}
        prefix={props.prefix}
        suffix={props.suffix}
        labelColor={props.labelColor}
      />
      <HorizontalLablesData
        label={props.horizontalData}
        data={props.data}
        prefix={props.prefix}
        suffix={props.suffix}
        barColor={props.barColor}
        secondBarColor={props.secondBarColor}
        barLabelColor={props.barLabelColor}
        labelColor={props.labelColor}
      />
    </View>
  );
};

export default BarChart;
