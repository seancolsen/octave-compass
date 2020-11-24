# Octave Compass

Octave Compass is an interactive web-based tool for exploring musical scales and the chords within them.

## Usage

1. Go to https://octavecompass.com/
1. Explore!
1. See "FAQ" within the app for more details.


## Developing

To run the app locally:

1. `git clone git@github.com:seancolsen/octave-compass.git`
1. `cd octave-compass`
1. `npm install`
1. `npm start`

It's built with [Typescript](https://www.typescriptlang.org/), [Svelte](https://svelte.dev/), and [Snowpack](https://www.snowpack.dev/).

Contributions welcome!! Please discuss changes within an issue first.

## Improving data

### Scale names

The scale name data lives in the following separate repository:

https://github.com/seancolsen/music-theory-data

I chose a separate repo so that other projects can use (and help maintain) this data too! It's stored in yaml format for ease of editing.

### Chords

The data for chords lives within this repo at `src/Data/chords.ts`.
