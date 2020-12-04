import type { Pitch } from "../../../Utils/Music/Pitch";

export interface VoiceProps {
  audioContext: AudioContext;
}

export abstract class Voice {

  audioContext: AudioContext;

  state: 'resting' | 'playing' | 'releasing' = 'resting';

  releaseTimeoutId: number | null = null;

  releaseTime = 0.25; // seconds

  /**
   * When multiple frequencies are present, they'll start with offsets to sound
   * like a guitar strum. The value specified below (in seconds) represents the
   * time between consecutive note attacks.
   */
  strumStagger = 0.03 // seconds

  constructor(props: VoiceProps) {
    this.audioContext = props.audioContext;
  }

  attack(pitches: Pitch[]) {
    if (this.state === 'playing') {return false;}
    if (this.state === 'releasing') {this.reset();}

    /**
     * This resume() call is here to accommodate the Chrome policy of suspending
     * until user interaction. Tutorials recommend running this with `await`,
     * but I had trouble with redundant key presses when making press() an async
     * function.
     */
    this.audioContext.resume();

    this.onAttack(pitches);

    this.state = 'playing';
    return true;
  }
  
  release() {
    if (this.state !== 'playing') {return;}

    this.onRelease();

    this.releaseTimeoutId = 
      window.setTimeout(() => this.reset(), this.releaseTime * 1000);
    this.state = 'releasing';

    /**
     * Call resume() here as well because apparently some WebKit versions only
     * act on resume() calls within touchend, not touchstart.
     */
    this.audioContext.resume();
  }
  
  reset() {
    if (this.releaseTimeoutId) {
      clearTimeout(this.releaseTimeoutId);
      this.releaseTimeoutId = null;
    }

    this.onReset();

    this.state = 'resting';
    
    /**
     * Call resume() here as well because apparently some WebKit versions only
     * act on resume() calls within touchend, not touchstart.
     */
    this.audioContext.resume();
  }
  
  protected abstract onAttack(pitches: Pitch[]): void
  
  protected abstract onRelease(): void
  
  protected abstract onReset(): void

}
