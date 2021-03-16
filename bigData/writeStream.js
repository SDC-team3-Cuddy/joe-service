// Reuse this to write one CSV file per table.
const writeCSV = (writeStream, lines, func, encoding, done) => {
  let i = lines;
  const write = () => {
    let canWrite = true;
    do {
      const csv = func(i, lines);
      i--;
      // Once i is 0, we finish writing.
      if (i === 0) {
        writeStream.write(csv, encoding, done);
      }
      else {
        canWrite = writeStream.write(csv, encoding);
      }
    } while (i > 0 && canWrite);

    // If buffer is full, wait until it has drained and continue writing.
    if (i > 0 && !canWrite) {
      if (i % 10000 === 0)
      console.log('drained!', i);
      writeStream.once('drain', write);
    }
  };
  write();
};

module.exports = { writeCSV };