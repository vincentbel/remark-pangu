runSpec(__dirname, {
  type: {
    definition: false,
    image: false,
    something: true,
    text: undefined,
  },
});
runSpec(__dirname, {
    parents: {
        link: {
          text: true
        }
    }
  });
  