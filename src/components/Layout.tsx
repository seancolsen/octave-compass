import React from 'react';
import Modal from 'react-responsive-modal';
import { Marquee } from "./Marquee";
import { Wheel } from "./Wheel";
import { Menu } from "./Menu";
import { Toolbar, Buttons } from "./Toolbar";
import { TwoWayButton } from "./common/TwoWayButton";
import { Button } from "./common/Button";
import { useStore } from './Store';
import { PointerBroadcaster } from './PointerBroadcaster';

type Modal = 'marquee' | 'notation' | null;

export function Layout() {
  const store = useStore();
  const [modal, setModal] = React.useState<Modal>(null);

  const buttons: Buttons = {
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
      <PointerBroadcaster>
        <div id='layout'>
          <Marquee showMore={() => setModal('marquee')}/>
          <Toolbar buttons={buttons}/>
          <div id='wheel-container'>
            <Wheel/>
            <div id='overlaid-buttons'>
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
        </div>
      </PointerBroadcaster>
    </div>
  );

}