import { Injectable } from '@nestjs/common';
import { traceSpan } from '../tracing';

@Injectable()
export class AppService {
  @traceSpan('trace get hello')
  async getHello(): Promise<any> {
    const res = [];
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve('123');
      }, 3000),
    );

    const fun1 = await this.fun1();
    //
    const func2 = await this.fun2();

    // const [fun1,
    //   func2] = await Promise.all([this.fun1(), this.fun2()])
    res.push(fun1);
    res.push(func2);
    res.push('Hello World!');
    return res;
  }

  @traceSpan()
  async fun1(): Promise<string> {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve('123');
      }, 3000),
    );
    return 'func1';
  }

  @traceSpan()
  async fun2(): Promise<string> {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve('123');
      }, 3000),
    );
    return 'func2';
  }
}
