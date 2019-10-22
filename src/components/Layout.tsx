import React from 'react';
import Modal from 'react-responsive-modal';
import { Marquee } from "./Marquee";
import { Wheel } from "./Wheel";
import { Notation } from "./Notation";
import { Menu } from "./Menu";
import { Toolbar, Buttons } from "./Toolbar";
import { TwoWayButton } from "./common/TwoWayButton";
import { Button } from "./common/Button";
import { Audio } from './WithAudio';
import { PitchSet } from '../Utils/Music/PitchSet';
import { StoreContext } from './Store';

interface Props {
  inversionText?: string;
  isNamed: boolean;
  pitchSet: PitchSet;
  title: string;
  audio: Audio;
}

type Modal = 'marquee' | 'notation' | null;

export function Layout(props: Props) {
  const store = React.useContext(StoreContext);
  const [modal, setModal] = React.useState<Modal>(null);

  const buttons: Buttons = {
    Staff: (props) => <Button
      onClick={() => setModal('notation')}
      icon='music'
      label={'staff'}
      {...props}
    />,
    Transpose: (props) => <TwoWayButton
      label='Transpose'
      stepFunction={store.shiftTonalCenter}
      buttonLabels={['down', 'up']}
      icons={['minus', 'plus']}
      {...props}
    />,
    Mode: (props) => <TwoWayButton
      label='Mode'
      stepFunction={store.shiftMode}
      buttonLabels={['prev', 'next']}
      icons={['caret-left', 'caret-right']}
      inverted
      {...props}
    />,
    About: (props) => <Button
      icon={['fab', 'github']}
      href={'https://github.com/seanmadsen/octave-compass'}
      target={'_blank'}
      label={'about'}
      {...props}
    />
  }

  return (
    <div id='app' className="App">
      <div id='layout'>
        <Marquee
          intervalSet={store.intervalSet}
          title={props.title}
          inversionText={props.inversionText}
          isNamed={props.isNamed}
          showMore={() => setModal('marquee')}
        />
        <Toolbar
          buttons={buttons}
        />
        <div id='wheel-container'>
          <Wheel
            shiftTonalCenter={store.shiftTonalCenter}
            shiftIntervalSet={store.shiftIntervalSet}
            intervalSet={store.intervalSet}
            tonalCenter={store.tonalCenter}
            pitchSet={props.pitchSet}
            toggleInterval={store.toggleInterval}
            selectedChords={store.selectedChords}
            playNotes={props.audio.playNotes}
            playOrdinalChord={props.audio.playOrdinalChord}
            ordinalChordsPlayed={props.audio.ordinalChordsPlayed}
          />
          <div id='overlaid-buttons'>
            <buttons.Staff className='corner bottom left'/>
            <buttons.Transpose className='corner top left'/>
            <buttons.Mode className='corner top right'/>
            <buttons.About className='corner bottom right'/>
          </div>
        </div>
        <Menu/>
      </div>
      <div id='modals'>
        <Modal
          open={modal === 'marquee'}
          onClose={() => setModal(null)}
        >
          <Marquee
            intervalSet={store.intervalSet}
            title={props.title}
            inversionText={props.inversionText}
            isNamed={props.isNamed}
            isWithinModal={true}
          />
        </Modal>
        <Modal
          open={modal === 'notation'}
          onClose={() => setModal(null)}
        >
          <div>
            <h2>{props.title}</h2>
            <Notation
              pitchSet={props.pitchSet}
              clef={store.clef}
            />
          </div>
        </Modal>
      </div>
    </div>
  );

}