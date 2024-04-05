import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SearchScreen = ({route}) => {
  //   const {name} = route.params;
  // console.log('nama ==> ', name);

  return (
    <View style={styles.container}>
      <Text>name</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
