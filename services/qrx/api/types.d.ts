type FileType = 'png' | 'jpeg';
type Theme = 'light' | 'dark';

interface QrOptions {
  fileType: FileType;
  text: string;
  theme: Theme;
  md: boolean;
  fontSize: string;
  images: string[];
}

interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}
