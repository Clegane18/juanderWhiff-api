const normalizeTexts = (...texts) => {
  return texts.map((text) => {
    if (!text) return null;
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  });
};

module.exports = { normalizeTexts };
