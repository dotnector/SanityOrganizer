/**
Declares Home Assistant connection and registry interfaces used by integration services.
 */
export interface HaStateEntry {
  entity_id: string;
  attributes: Record<string, unknown>;
}

export interface HaConnection {
  states: Record<string, HaStateEntry>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

export interface HaDeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
}

export interface HaEntityRegistryEntry {
  entity_id: string;
  name?: string | null;
  original_name?: string | null;
  device_id?: string | null;
  platform?: string;
}
