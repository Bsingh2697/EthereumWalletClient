import {
  StyleSheet,
  Text,
  View,
  Animated,
  Touchable,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const AnimationsPrac = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => {
        console.log('onStartShouldSetPanResponder');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onStartShouldSetPanResponder - END');
        return true;
      },

      // 1
      onStartShouldSetPanResponderCapture: (e, gesture) => {
        console.log('onStartShouldSetPanResponderCapture');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onStartShouldSetPanResponderCapture - END');
        return true;
      },

      onMoveShouldSetPanResponder: (e, gesture) => {
        console.log('onMoveShouldSetPanResponder');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onMoveShouldSetPanResponder - END');
        return true;
      },

      onMoveShouldSetPanResponderCapture: (e, gesture) => {
        console.log('onMoveShouldSetPanResponderCapture');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onMoveShouldSetPanResponderCapture - END');
        return true;
      },

      //2
      onPanResponderGrant: (e, gesture) => {
        console.log('onPanResponderGrant');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('PanResponder :', pan);
        console.log('onPanResponderGrant - END');
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },

      onPanResponderMove: (e, gesture) => {
        console.log('onPanResponderMove');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onPanResponderMove - END');
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },

      onPanResponderTerminationRequest: (e, gesture) => {
        console.log('onPanResponderTerminationRequest');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onPanResponderTerminationRequest - END');
        return true;
      },

      // 3
      onPanResponderRelease: (e, gesture) => {
        console.log('onPanResponderRelease');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onPanResponderRelease - END');
        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          duration: 1000,
          useNativeDriver: true,
        }).start();
        // originalPosition();
        // pan.x.setValue(0);
        // pan.y.setValue(0);
      },

      onPanResponderTerminate: (e, gesture) => {
        console.log('onPanResponderTerminate');
        console.log('Event :', e);
        console.log('Gesture :', gesture);
        console.log('onPanResponderTerminate - END');
      },
    }),
  ).current;

  const originalPosition = () => {
    Animated.spring(pan, {
      // toValue: {x: 0, y: 0},
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'green',
          transform: [
            {
              translateX: pan.x,
            },
            {
              translateY: pan.y,
            },
          ],
        }}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default AnimationsPrac;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
