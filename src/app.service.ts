import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): any {
    return {
      status: 'healthy',
    };
  }

  hello() {
    return 'Hello';
  }
}
