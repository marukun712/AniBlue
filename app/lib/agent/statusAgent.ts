import { Agent, CredentialSession } from "@atproto/api";
import { AppNetlifyAniblueNS } from "~/generated/api";
import { Record } from "~/generated/api/types/app/netlify/aniblue/status";

export class StatusAgent extends Agent {
  agent: AppNetlifyAniblueNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new AppNetlifyAniblueNS(this);
  }

  static credential(serviceUrl: string = "https://public.api.bsky.app") {
    const session = new CredentialSession(new URL(serviceUrl));
    return new StatusAgent(session);
  }

  async get(did: string) {
    try {
      return await this.agent.status.get({
        repo: did,
        rkey: "self",
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async put(record: Record, did: string) {
    try {
      return await this.com.atproto.repo.putRecord({
        collection: "app.netlify.aniblue.status",
        repo: did,
        rkey: "self",
        record,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async delete(did: string) {
    try {
      return await this.agent.status.delete({
        repo: did,
        rkey: "self",
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
