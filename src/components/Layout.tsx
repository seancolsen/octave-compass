import React from 'react';
import Modal from 'react-responsive-modal';
import { Marquee } from "./Marquee";
import { Wheel } from "./Wheel";
import { Notation } from "./Notation";
import { Menu } from "./Menu";
import { Toolbar, Buttons } from "./Toolbar";
import { TwoWayButton } from "./common/TwoWayButton";
import { Button } from "./common/Button";
import { StoreContext } from './Store';

type Modal = 'marquee' | 'notation' | null;

export function Layout() {
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
        <Marquee showMore={() => setModal('marquee')}/>
        <Toolbar buttons={buttons}/>
        <div id='wheel-container'>
          <Wheel/>
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
          <Marquee isWithinModal={true}/>
        </Modal>
        <Modal
          open={modal === 'notation'}
          onClose={() => setModal(null)}
        >
          <div>
            <h2>{store.title}</h2>
            <Notation
              pitchSet={store.pitchSet}
              clef={store.clef}
            />
          </div>
        </Modal>
      </div>
    </div>
  );

}