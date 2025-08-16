import { fence } from "./fence.js";
import { note } from "./note.js";
import { comment } from "./comment.js";
import { figure } from "./figure.js";
import { heading } from "./heading.js";
import { footnote } from "./footnote.js";
import { document } from "./document.js";
import { image } from "./image.js";

const config = {
  nodes: { fence, heading, document, image },
  tags: { image, note, comment, figure, footnote },
};

export default config;
