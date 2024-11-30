/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppNetlifyAniblueStatus from './types/app/netlify/aniblue/status'

export * as AppNetlifyAniblueStatus from './types/app/netlify/aniblue/status'

export class AtpBaseClient extends XrpcClient {
  app: AppNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  netlify: AppNetlifyNS

  constructor(client: XrpcClient) {
    this._client = client
    this.netlify = new AppNetlifyNS(client)
  }
}

export class AppNetlifyNS {
  _client: XrpcClient
  aniblue: AppNetlifyAniblueNS

  constructor(client: XrpcClient) {
    this._client = client
    this.aniblue = new AppNetlifyAniblueNS(client)
  }
}

export class AppNetlifyAniblueNS {
  _client: XrpcClient
  status: StatusRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.status = new StatusRecord(client)
  }
}

export class StatusRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppNetlifyAniblueStatus.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.netlify.aniblue.status',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppNetlifyAniblueStatus.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.netlify.aniblue.status',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppNetlifyAniblueStatus.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.netlify.aniblue.status'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection: 'app.netlify.aniblue.status',
        rkey: 'self',
        ...params,
        record,
      },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.netlify.aniblue.status', ...params },
      { headers },
    )
  }
}
