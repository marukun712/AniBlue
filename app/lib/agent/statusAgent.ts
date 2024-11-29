import { Agent } from "@atproto/api";
import { AppVercelAniblueNS } from "~/generated/api";
import { Record } from "~/generated/api/types/app/vercel/aniblue/status";

export class StatusAgent extends Agent {
  agent: AppVercelAniblueNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new AppVercelAniblueNS(this);
  }

  async get(did: string) {
    return await this.agent.status.get({
      repo: did,
      rkey: "self",
    });
  }

  async put(record: Record, did: string) {
    return await this.com.atproto.repo.putRecord({
      collection: "app.vercel.aniblue.status",
      repo: did,
      rkey: "self",
      record,
    });
  }

  async delete(did: string) {
    return await this.agent.status.delete({
      repo: did,
      rkey: "self",
    });
  }
}
