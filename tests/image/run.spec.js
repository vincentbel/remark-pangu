runSpec(__dirname);
runSpec(__dirname, {
  type: {
    image: false,
  },
});
runSpec(__dirname, {
  type: {
    imageReference: false,
  },
});
