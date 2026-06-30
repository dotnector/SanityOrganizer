import "./index.css";
import "./sanityorganizer.ts";
import { RuntimeResolver } from "./infrastructure/RuntimeResolver";

type OrganizerElement = HTMLElement & { runtime?: unknown };

const runtime = new RuntimeResolver().resolveForBrowser();

if (runtime) {
	const elements = document.querySelectorAll("sanity-organizer");
	for (const element of elements) {
		(element as OrganizerElement).runtime = runtime;
	}
}