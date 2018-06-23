import React from 'react';
import Marquee from "components/Marquee";
import Wheel from "components/Wheel";
import Notation from "components/Notation";
import Menu from "components/Menu";
import Modal from 'react-responsive-modal';
import Toolbar from "components/Toolbar";
import TwoWayButton from "components/common/TwoWayButton";
import Button from "components/common/Button";

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: null,
    }
  }

  closeModal = () => {
    this.setState({modal: null});
  };

  openModal = (modalName) => {
    this.setState({modal: modalName});
  };

  buttons() {
    return {
      Staff: (props) => <Button
        onClick={() => this.openModal('notation')}
        icon='music'
        label={'staff'}
        {...props}
      />,
      Transpose: (props) => <TwoWayButton
        label='Transpose'
        stepFunction={this.props.shiftTonalCenter}
        buttonLabels={['down', 'up']}
        icons={['minus', 'plus']}
        {...props}
      />,
      Mode: (props) => <TwoWayButton
        label='Mode'
        stepFunction={this.props.shiftMode}
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
    };
  }

  render() {
    const Buttons = this.buttons();
    return (
      <div id='app' className="App">
        <div id='layout'>
          <Marquee
            intervalSet={this.props.intervalSet}
            title={this.props.title}
            inversionText={this.props.inversionText}
            isNamed={this.props.isNamed}
            showMore={() => this.openModal('marquee')}
          />
          <Toolbar
            buttons={Buttons}
          />
          <div id='wheel-container'>
            <Wheel
              shiftTonalCenter={this.props.shiftTonalCenter}
              shiftIntervalSet={this.props.shiftIntervalSet}
              intervalSet={this.props.intervalSet}
              tonalCenter={this.props.tonalCenter}
              pitchSet={this.props.pitchSet}
              toggleInterval={this.props.toggleInterval}
              selectedChords={this.props.selectedChords}
              playNotes={this.props.audio.playNotes}
              playIntervals={this.props.audio.playIntervals}
              playOrdinalChord={this.props.audio.playOrdinalChord}
              ordinalChordsPlayed={this.props.audio.ordinalChordsPlayed}
            />
            <div id='overlaid-buttons'>
              <Buttons.Staff className='corner bottom left'/>
              <Buttons.Transpose className='corner top left'/>
              <Buttons.Mode className='corner top right'/>
              <Buttons.About className='corner bottom right'/>
            </div>
          </div>
          <Menu
            selectedChords={this.props.selectedChords}
            setChordSet={this.props.setChordSet}
            toggleChord={this.props.toggleChord}
            intervalSet={this.props.intervalSet}
          />
        </div>
        <div id='modals'>
          <Modal
            open={this.state.modal === 'marquee'}
            onClose={this.closeModal}
          >
            <Marquee
              intervalSet={this.props.intervalSet}
              title={this.props.title}
              inversionText={this.props.inversionText}
              isNamed={this.props.isNamed}
              isWithinModal={true}
            />
          </Modal>
          <Modal
            open={this.state.modal === 'notation'}
            onClose={this.closeModal}
          >
            <div>
              <h2>{this.props.title}</h2>
              <Notation
                pitchSet={this.props.pitchSet}
                clef={this.props.clef}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}