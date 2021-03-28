import { AsyncStorage } from '@react-native-community/async-storage'
import Reactotron from 'reactotron-react-native'
import sagaPlugin from 'reactotron-redux-saga'

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "Polls App"
  }) // controls connection & communication settings
  .use(sagaPlugin())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

  export default reactotron
