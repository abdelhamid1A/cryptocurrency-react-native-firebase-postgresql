import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch,Route } from 'react-router-native';
import CryptoInfo from './app/components/CryptoInfo'
import Statistic from './app/components/Statistic'
import Account from './app/components/Account'
import Buy from './app/components/Buy'
import Sale from './app/components/Sale'
import SignIn from './app/auth/SignIn'
import SignUp from './app/auth/SignUp'
import Loading from './app/shared/Loading'


export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/info' component={CryptoInfo} />
        <Route exact path='/statistic' component={Statistic} />
        <Route exact path='/buy' component={Buy} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/sale' component={Sale} />
        {/* <Route exact path='/' component={Statistic} /> */}
      </Switch>
    </NativeRouter>
    // <Text>sds</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
