import { ILanguage, codeStub, engineURL } from './constants';

export class Engine {
  private static instance: Engine;
  private stubs: ILanguage;
  private engineLocation: ILanguage;
  private topicForStdout: string;

  constructor() {
    this.topicForStdout = 'docker-app-stdout';
    this.stubs = codeStub;
    this.engineLocation = engineURL;
  }

  public static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
  }

  public getStub(language: 'c' | 'cpp' | 'js'): string {
    return this.stubs[language];
  }

  public getEngineLocation(language: 'c' | 'cpp' | 'js'): string {
    return this.engineLocation[language];
  }

  public getTopicForStdOut(): string {
    return this.topicForStdout;
  }
}
