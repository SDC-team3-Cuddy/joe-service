// Reuse this to write one CSV file per table.
const writeCSV = (writeStream, lines, func, encoding, done) => {
  let i = lines;
  const write = () => {
    let canWrite = true;
    do {
      const csv = func(i, lines);
      i--;
      // Once i is 0, we finish writing.
      if (i === 0) writeStream.write(csv, encoding, done);
      else canWrite = writeStream.write(csv, encoding);
    } while (i > 0 && canWrite);

    // If buffer is full, wait until it has drained and continue writing.
    if (i > 0 && !canWrite) { writeStream.once('drain', write); }
  };
  write();
};

/*
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
const writeCSV = (writer, lines, func, encoding, callback) => {
  let i = lines;
  write();
  function write() {
    let ok = true;
    do {
      let data = func(i, lines);
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
};

*/

module.exports = { writeCSV };