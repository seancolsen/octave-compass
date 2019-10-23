import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faMusic, faCaretLeft, faCaretRight }
  from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { WithAudio } from "./WithAudio";
import { RouteProcessor } from "./RouteProcessor";
import { Layout } from "./Layout";
import { StoreProvider } from "./Store";

library.add(faPlus, faMinus, faMusic, faCaretLeft, faCaretRight,
  faGithub);

export default class App extends React.Component {


  // constructor(props: Props) {
  //   super(props);
  //   const stateFromUrl = App.stateFromUrl();
  // }

  // static stateFromUrl() {
  //   return Url.parse(window.location.pathname);
  // }

  // updateStateFromUrl() {
  //   this.setState(App.stateFromUrl());
  // }

  // componentDidMount() {
  //   window.addEventListener('popstate', () => this.updateStateFromUrl());
  // }

  render() {

    return (
      <StoreProvider>
        <>
          {/* <RouteProcessor
            windowTitle={computedState.title}
          /> */}
          <WithAudio>{ audio => (
            <Layout audio={audio}/>
          )}</WithAudio>
        </>
      </StoreProvider>
    );
  }
}
