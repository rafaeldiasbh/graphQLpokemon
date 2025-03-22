import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  constructor() {}

  async hello(): Promise<string> {
    return 'Hello World!';
  }
}
