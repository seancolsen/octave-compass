import React from 'react';
import Modal from 'react-responsive-modal';
import { Marquee } from "./Marquee";
import { Wheel } from "./Wheel";
import { Menu } from "./Menu";
import { Toolbar } from "./Toolbar";

type Modal = 'marquee' | null;

export function Layout() {
  const [modal, setModal] = React.useState<Modal>(null);

  return (
    <div id='app' className="App">
      <div id='layout'>
        <Marquee showMore={() => setModal('marquee')}/>
        <Toolbar />
        <div id='wheel-container'><Wheel/></div>
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
    </div>
  );

}