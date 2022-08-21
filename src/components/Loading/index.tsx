import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './styles';

const LoadingComponent = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
  </View>
);

export default LoadingComponent;