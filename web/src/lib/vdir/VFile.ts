import shortId from "shortid";

export default class VFile {
  name: string;

  webkitRelativePath: string;

  type: string;

  size = 0;

  lastModified = 0;

  lastModifiedDate = "2006-01-02 15:04:05";

  constructor({
    name,
    webkitRelativePath,
    type,
    size,
    lastModified,
    lastModifiedDate
  }: BucketItem) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.lastModified = lastModified;
    this.lastModifiedDate = lastModifiedDate;
    this.webkitRelativePath = webkitRelativePath;
  }
}
