import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faMusic, faCaretLeft, faCaretRight }
  from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { WithAudio } from "./WithAudio";
import { RouteProcessor } from "./RouteProcessor";
import { Layout } from "./Layout";
import { StoreProvider } from "./Store";
import { Url } from './../Utils/Text/Url';

library.add(faPlus, faMinus, faMusic, faCaretLeft, faCaretRight,
  faGithub);

export default function App() {
  let initialValuesFromUrl = Url.parse(window.location.pathname);
  
  return (
    <StoreProvider
      initialTonalCenter={initialValuesFromUrl.tonalCenter}
      initialIntervalSet={initialValuesFromUrl.intervalSet}
    >
      <>
        <RouteProcessor/>
        <WithAudio>{ audio => (
          <Layout audio={audio}/>
        )}</WithAudio>
      </>
    </StoreProvider>
  );
}
