import SocketClient, { Socket } from 'socket.io-client';

export class SocketHandler {
  private static instance: SocketHandler;
  private client: typeof Socket;

  public getSocketInstance() {
    return this.client;
  }
  public handleNewConnection(serverURL: string) {
    // remove the old connection if it exists
    if (this.client && this.client.connected) this.client.disconnect();
    this.client = SocketClient.connect(serverURL);
  }

  public static getInstance(): SocketHandler {
    if (!SocketHandler.instance) {
      SocketHandler.instance = new SocketHandler();
    }
    return SocketHandler.instance;
  }
}
