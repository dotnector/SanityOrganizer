import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sanity-organizer")
export class SanityOrganizer extends LitElement
{
    protected override render()
    {
        return html`
            <h1>Sanity Organizer</h1>
        `;
    }

    public static override styles = css`
        :host {
            display: block;
            padding: 16px;
            font-family: sans-serif;
        }
    `;
}