import * as stream from "stream";

export class MemoryStream extends stream.Writable {
  private _chunks: any[] = [];

  _write(chunk: any, _encoding: BufferEncoding, next: (error?: Error | null) => void): void {
    this._chunks.push(chunk);
    next();
  }

  toBuffer(): Buffer {
    return Buffer.concat(this._chunks);
  }
}
