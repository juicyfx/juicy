import { NowRequest, NowResponse } from "@vercel/node";

export class Flow<T extends object> {

  private _pipes: FlowPipe<T>[] = [];
  private _catchers: FlowCatcher<T>[] = [];
  private _req: NowRequest;
  private _res: NowResponse;
  private _dispatched: boolean = false;

  constructor(req: NowRequest, res: NowResponse) {
    this._req = req;
    this._res = res;
  }

  public static from<T extends object>(req: NowRequest, res: NowResponse): Flow<T> {
    return new this(req, res);
  }

  public pass(callback: FlowPipe<T>): this {
    this._pipes.push(callback);
    return this;
  }

  public validate(callback: FlowPipe<T>): this {
    this._pipes.push(callback);
    return this;
  }

  public use(callback: FlowPipe<T>): this {
    this._pipes.push(callback);
    return this;
  }

  public catch(callback: FlowCatcher<T>): this {
    this._catchers.push(callback);
    return this;
  }

  public async run(): Promise<void> {
    const data = {
      req: this._req,
      res: this._res,
      app: this._createApp(),
      ctx: {} as T,
    }

    try {
      await this._runner(data);
    } catch (e) {
      await this._fallback(data, { exception: e });
    }
  }

  private async _runner(data: FlowData<T>): Promise<void> {
    for await (const pipe of this._pipes) {
      // If flow is already dispatch, break the loop
      if (this._dispatched) {
        break;
      }

      await pipe(data);
    }
  }

  private async _fallback(data: FlowData<T>, error: FlowError) {
    for await (const catcher of this._catchers) {
      // If flow is already dispatch, break the loop
      if (this._dispatched) {
        break;
      }

      await catcher(data, error);
    }
  }

  private _createApp(): FlowApp {
    return {
      json: (code: number, data: any) => {
        this._res.status(code);
        this._res.json(data);
        this._dispatched = true;
      }
    }
  }
}
