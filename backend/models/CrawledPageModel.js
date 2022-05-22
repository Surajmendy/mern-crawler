import mongoose, { Schema } from 'mongoose';

const crawledPageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  metaDescription: {
    type: String
  },
  h1: {
    type: String
  },
  h2: {
    type: String
  },
  links: {
    type: Array
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CrawledPage', crawledPageSchema);
