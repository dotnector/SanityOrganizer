import type { HaConnection, HaStateEntry } from "../domain/HaConnection";

export class HaRuntimeConnection implements HaConnection {
  private runtime: HaConnection;

  public constructor(runtime: HaConnection) {
    this.runtime = runtime;
  }

  public updateHass(hass: HaConnection): void {
    this.runtime = hass;
  }

  public get states(): Record<string, HaStateEntry> {
    return this.runtime.states;
  }

  public async callWS<T>(msg: Record<string, unknown>): Promise<T> {
    return this.runtime.callWS<T>(msg);
  }
}
