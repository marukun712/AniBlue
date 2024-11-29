import { DidDocument, IdResolver, MemoryCache } from "@atproto/identity";

const HOUR = 60e3 * 60;
const DAY = HOUR * 24;

export function createIdResolver() {
  return new IdResolver({
    didCache: new MemoryCache(HOUR, DAY),
  });
}

export const getServiceEndpoint = (document: DidDocument) => {
  const serviceUrl = document.service?.find(
    (item) => item.id === "#atproto_pds"
  )?.serviceEndpoint;
  if (typeof serviceUrl !== "string") {
    return null;
  }
  return serviceUrl;
};
