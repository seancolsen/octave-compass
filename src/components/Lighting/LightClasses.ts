import type { Note } from "../../Utils/Music/Note";
import type { Pitch } from "../../Utils/Music/Pitch";

function pitchClass(pitch: Pitch) {
  return `pitch-${pitch.note.id}-${pitch.octave}`;
}

function noteClass(note: Note) {
  return `note-${note.id}`;
}

function noteWithinPitchClass(note: Note) {
  return `note-within-pitch-${note.id}`;
}

export function lightClassesForNoteLight(note: Note) {
  return [ noteClass(note) ];
}

export function lightClassesForPitchLight(pitch: Pitch) {
  return [ pitchClass(pitch), noteWithinPitchClass(pitch.note) ];
}

function noteEventSearchClasses(notes: Note[]) {
  return notes.map(n => [noteWithinPitchClass(n), noteClass(n)]).flat();
}

function pitchEventSearchClasses(pitches: Pitch[]) {
  return pitches.map(p => [pitchClass(p), noteClass(p.note)]).flat();
}

type ClassMatcherProps = {notes: Note[]} | {pitches: Pitch[]}

export function classMatcher(props: ClassMatcherProps) {
  const searchClasses = 'pitches' in props
    ? pitchEventSearchClasses(props.pitches)
    : noteEventSearchClasses(props.notes);
  return (classesOnLight: string[]) => 
    classesOnLight.some(classOnLight => searchClasses.includes(classOnLight));
}
