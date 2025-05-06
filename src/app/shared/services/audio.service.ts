import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private synth = new Tone.Synth().toDestination();

  async playNote(note: string, duration: string = '8n') {
    await Tone.start();
    this.synth.triggerAttackRelease(note, duration);
  }

  transpose(note: string, octaves: number): string {
    const regex = /^([A-G])(#|b)?(\d)$/;
    const match = note.match(regex);
    if (!match) return note;

    const [, letter, accidental, octaveStr] = match;
    const newOctave = parseInt(octaveStr, 10) + octaves;
    return `${letter}${accidental || ''}${newOctave}`;
  }
}
