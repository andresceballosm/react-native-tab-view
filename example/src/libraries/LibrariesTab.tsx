import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap,SceneRendererProps,TabBar, NavigationState } from 'react-native-tab-view';
import { LibrariesMap } from './LibrariesMap';
import { Ionicons } from '@expo/vector-icons';
import { LibrariesList } from './LibrariesList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

type Route = {
  key: string;
  title:String;
  icon: string;
  color: [number, number, number];
};

type State = NavigationState<Route>;

export default class CustomIndicatorExample extends React.Component<{}, State> {
  static title = 'Colombian Libraries';
  static backgroundColor = '#1E63B1';
  static appbarElevation = 4;

  state = {
    index: 0,
    libraries: null,
    routes: [
      {
        key: 'librariesmaps',
        title: 'Maps',
        icon: 'ios-map',
        color: '#ffffff',
      },
      {
        key: 'librarieslist',
        title: 'Libraries',
        icon: 'ios-paper',
        color: '#ffffff',
      },
    ],
  };

  private renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      renderIcon={this.renderIcon}
      indicatorStyle={{backgroundColor: '#e0eefa'}}
      style={{backgroundColor: "#5f92ce"}}
    />
  );

  componentDidMount() {
    fetch('https://www.datos.gov.co/resource/in3j-awgi.json')
    .then(res => res.json())
    .then((data) => {
      this.setState({ libraries: data })
    })
    .catch(console.log)
  }

  render() {

    const FirstRoute = () => {
      return (
        <LibrariesMap libraries={this.state.libraries} />
      )
    };
    
    const SecondRoute = () => {
      return (
        <LibrariesList  libraries={this.state.libraries}/>
      )
    };

    return (
      <TabView
        navigationState={this.state}
        renderTabBar={this.renderTabBar}
        renderScene={SceneMap({
          librariesmaps: FirstRoute,
          librarieslist: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
  private renderIcon = ({ route }: { route: Route }) => (
    <Ionicons name={route.icon} size={24} style={styles.icon} />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});