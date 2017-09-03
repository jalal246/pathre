const INV = 'Invalid';

const errMsg = [
  `${INV} callback function`,
  // `${INV} file path`,
];

// function to generates error as you see.
const errize = msgIndex => new Error(`\x1b[33m${errMsg[msgIndex]}\x1b[0m`);

// boolean check if callback function
const isCB = cb => typeof cb === 'function';

export {
  errize,
  isCB,
};
