import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faMusic, faCaretLeft, faCaretRight }
  from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { RouteProcessor } from "./RouteProcessor";
import { Layout } from "./Layout";
import { StoreProvider } from "./Store";
import { Url } from './../Utils/Text/Url';
import { useAudio } from "./useAudio";

library.add(faPlus, faMinus, faMusic, faCaretLeft, faCaretRight,
  faGithub);

export default function App() {
  let initialValuesFromUrl = Url.parse(window.location.pathname);

  const audio =  useAudio();

  return (
    <StoreProvider initialValues={initialValuesFromUrl} audio={audio} >
      <>
        <RouteProcessor/>
        <Layout/>
      </>
    </StoreProvider>
  );
}
