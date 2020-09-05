<script lang="ts">

</script>

<!-- import React from 'react';
import { SliceOfChords } from './SliceOfChords';
import { OrdinalChordSet } from '../../../Utils/Music/OrdinalChordSet';
import { useStore } from '../../Store';
import { observer } from 'mobx-react-lite';

interface Props {
  ordinalChordSets: OrdinalChordSet[];
  rotation: number;
}

export const SwarmOfChords = observer((props: Props) => {
  const store = useStore();
  const ordinals = store.intervalSet.ordinals;
  const slices = props.ordinalChordSets.map((ordinalChordSet, index) => {
    const ordinal = ordinalChordSet.ordinal;
    const note = store.noteSet.notes[ordinals.findIndex(o => o === ordinal)];
    return <SliceOfChords
      key={index}
      note={note}
      chordSet={ordinalChordSet.chordSet}
      ordinal={ordinal}
      rotation={props.rotation}
    />;
  });
  return <g style={{filter: 'url(#shadow-when-play)'}}>{slices}</g>;
}); -->
