import type { HaConnection, HaStateEntry } from "../domain/HaConnection";

/**
Wraps and forwards Home Assistant connection calls while allowing runtime replacement.
 */
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
