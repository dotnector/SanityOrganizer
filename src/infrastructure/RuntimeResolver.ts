import type { OrganizerRuntime } from "../app/contracts/OrganizerRuntime";
import type { HaConnection } from "../ha/domain/HaConnection";
import { HomeAssistantOrganizerRuntime } from "./homeassistant/HomeAssistantOrganizerRuntime";
import type { MockDatasetSize } from "./mock/MockDatasetSize";
import { MockOrganizerRuntime } from "./mock/MockOrganizerRuntime";

export class RuntimeResolver {
  public resolveFromHass(hass: HaConnection): OrganizerRuntime {
    return new HomeAssistantOrganizerRuntime(hass);
  }

  public resolveForBrowser(): OrganizerRuntime | null {
    if (this.isHomeAssistantShell()) {
      return null;
    }
    return new MockOrganizerRuntime(this.resolveMockSize());
  }

  private isHomeAssistantShell(): boolean {
    return document.querySelector("home-assistant") !== null;
  }

  private resolveMockSize(): MockDatasetSize {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("mockSize");
    if (requested === "small" || requested === "medium" || requested === "large") {
      window.localStorage.setItem("sanity_organizer_mock_size", requested);
      return requested;
    }

    const stored = window.localStorage.getItem("sanity_organizer_mock_size");
    if (stored === "small" || stored === "medium" || stored === "large") {
      return stored;
    }

    return "medium";
  }
}
