import NoteName from './NoteName';

test('unicode', () => {
  expect((new NoteName('B', 'flat')).unicode).toBe('B♭');
});

test('direction', () => {
  expect((new NoteName('B', 'flat')).direction).toBe('flat');
  expect((new NoteName('C', 'natural')).direction).toBe('none');
  expect((new NoteName('C', 'sharp')).direction).toBe('sharp');
  expect((new NoteName('C', 'doubleSharp')).direction).toBe('sharp');
  expect((new NoteName('A', 'doubleFlat')).direction).toBe('flat');
});
