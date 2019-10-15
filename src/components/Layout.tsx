import React from 'react';
import Modal from 'react-responsive-modal';
import { Marquee } from "./Marquee";
import { Wheel } from "./Wheel";
import { Notation } from "./Notation";
import { Menu } from "./Menu";
import { Toolbar, Buttons } from "./Toolbar";
import { TwoWayButton } from "./common/TwoWayButton";
import { Button } from "./common/Button";
import { IntervalSet } from '../Utils/Music/IntervalSet';
import { ChordSet } from '../Utils/Music/ChordSet';
import { Audio } from './WithAudio';
import { Chord } from '../Utils/Music/Chord';
import { PitchSet } from '../Utils/Music/PitchSet';

interface Props {
  intervalSet: IntervalSet;
  tonalCenter: number;
  selectedChords: ChordSet;
  clef: string;
  setChordSet(cs: ChordSet): void;
  shiftIntervalSet(rotation: number): void;
  shiftMode(amount: number): void;
  shiftTonalCenter(intervalDiff: number): void;
  toggleChord(chord: Chord): void ;
  toggleInterval(ordinal: number): void;
  inversionText?: string;
  isNamed: boolean;
  pitchSet: PitchSet;
  title: string;
  audio: Audio;
}

type Modal = 'marquee' | 'notation' | null;
interface State {
  modal: Modal;
}

export class Layout extends React.Component<Props, State> {

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      modal: null,
    }
  }

  closeModal = () => {
    this.setState({modal: null});
  };

  openModal = (modalName: Modal) => {
    this.setState({modal: modalName});
  };

  buttons(): Buttons {
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