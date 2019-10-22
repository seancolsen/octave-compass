import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faMusic, faCaretLeft, faCaretRight }
  from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { WithComputedState } from "./WithComputedState";
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
        <WithComputedState>{ computedState => (
          <>
            {/* <RouteProcessor
              windowTitle={computedState.title}
            /> */}
            <WithAudio
              pitchSet={computedState.pitchSet}
            >{ audio => (
              <Layout
                inversionText={computedState.inversionText}
                isNamed={computedState.isNamed}
                pitchSet={computedState.pitchSet}
                title={computedState.title}
                audio={audio}
              />
            )}</WithAudio>
          </>
        )}</WithComputedState>
      </StoreProvider>
    );
  }
}
