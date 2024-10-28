const app = require("./app");
const port = process.env.PORT || 3003;
const Comparison = require("./database/models/ai-chatbot/comparisonModel");

Comparison.destroy({
  where: {},
  truncate: true, // This will delete all entries
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
