import { create } from 'lodash';

export type HrTime = [number, number];

/**
 * Calculate the difference between two Node hrtime (`[second, nanosecond]`)
 * tuples.
 *
 * Based on: https://github.com/firefoxes/diff-hrtime/blob/master/index.js
 */
const subtractTime = (a: HrTime, b: HrTime): HrTime => {
  // Capture seconds and nanoseconds
  const [aS, aNS] = a;
  const [bS, bNS] = b;
  let ns = aNS - bNS; // Nanoseconds delta
  let s = aS - bS; // Seconds delta

  // If we have overflow nanoseconds
  if (ns >= 1e9) {
    s -= 1; // Subtract a second
    ns += 1e9; // Add a billion nanoseconds
  }

  return [s, ns];
};

let startTime: HrTime;
let pauses: HrTime[] = [];
let resumes: HrTime[] = [];

export function createTimer() {
  return {
    start: () => {
      startTime = process.hrtime();
      pauses = resumes = [];
    },

    pause: () => {
      pauses.push(process.hrtime());
    },

    resume: () => {
      resumes.push(process.hrtime(pauses.pop()));
    },

    stop: () => resumes.reduce((prev, curr) => subtractTime(prev, curr), process.hrtime(startTime)),
  };
}

export type Timer = ReturnType<typeof createTimer>;
