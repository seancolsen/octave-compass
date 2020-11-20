<script lang="ts">
  import QA from './QA.svelte';
  import Q from './Q.svelte';
  import A from './A.svelte';

</script>

<!-- Template
<QA>
  <Q></Q>
  <A></A>
</QA>
<!--  -->

<QA>
  <Q>How can I use Octave Compass to find the scale for a song?</Q>
  <A>
    <ol>
      <li>Listen to the song while using this app.</li>
      <li>Find the 
        <a href='https://en.wikipedia.org/wiki/Tonic_(music)'>
          tonal center
        </a>
        by listening for the note to which melodies most commonly resolve.
        For this step, it can be helpful to set the scale to "Chromatic"
        (choose "Scale Index" and click the first result), and
        then select "Circular Keyboard" so that you can play all possible
        notes. Next try playing notes along with the song to see which one
        "feels" the most like the tonal center. Some songs are more tonal than
        others, and if your song in question is quite
        <a href='https://en.wikipedia.org/wiki/Atonality'>
          atonal
        </a>
        then you might have a difficult time using this app to model the
        song.</li>
      <li>Once you've found the tonal center, select "Scale Editor" and rotate
        the keyboard so that your tonal center note is at the top.</li>
      <li>Toggle the other intervals on and off while listening to the sound
        of that interval. If your song appears to contain that note, then leave
        the box checked.</li>
    </ol>
  </A>
</QA>

<QA>
  <Q>Where can I find the source code for Octave Compass?</Q>
  <A>Octave Compass is open source (GPL v3.0) and welcomes contributions!
    You can head to the
    <a href='https://github.com/seancolsen/octave-compass'>
      GitHub repository
    </a> to open issues or pull requests. It is built with Typescript and
    Svelte.</A>
</QA>

<QA>
  <Q>How can I save a scale or share it with someone else?</Q>
  <A>Your browser's URL will change as you modify the scale and tonal center.
    You can bookmark the URL or copy it somewhere to follow later.</A>
</QA>

<QA>
  <Q>Does Octave Compass have a mobile app?</Q>
  <A>No, but you can choose "add to home screen" on most mobile browsers to
    achieve a similar effect.</A>
</QA>

<QA>
  <Q>Why does the linear keyboard sound different from the circular
    keyboard?</Q>
  <A>The circular keyboard uses
    <a href='https://en.wikipedia.org/wiki/Octave#Equivalence'>
      octave equivalence
    </a>
    to place different pitches like C<sub>4</sub> and C<sub>5</sub>
    at the same position, refrring to them both simply as the note "C".
    
    To illustrate this concept auditorily, the circular keyboard uses a
    <a href="https://en.wikipedia.org/wiki/Shepard_tone">Shepard Tone</a>
    for the sound which is also octave-independent, making it the perfect
    sound for this situation.
    The chord buttons use the same Shepard Tone as well. The linear keyboard, by
    contrast, has different buttons for C<sub>4</sub> and C<sub>5</sub>, so it
    does not use a Shepard Tone.</A>
</QA>

<QA>
  <Q>Can I use Octave Compass to visualize a non-octave-repeating scale such as a
    <a href='https://en.wikipedia.org/wiki/Bohlen%E2%80%93Pierce_scale'>
      Bohlen Pierce Scale
    </a>?</Q>
  <A>No. All scales must be octave-repeating.</A>
</QA>

<QA>
  <Q>Can I use Octave Compass to visualize microtonal scales?</Q>
  <A>No. All scales must use
    <a href='https://en.wikipedia.org/wiki/Equal_temperament'>
      Equal Temperament
    </a>.</A>
</QA>

<QA>
  <Q>Where are the ninth chords and other extended chords?</Q>
  <A>This app doesn't display any extended chords because those chords are
    difficult to represent within a strictly octave-repeating context such
    as the circular keyboard.</A>
</QA>

<style>
  ol {
    margin: 0;
  }
</style>