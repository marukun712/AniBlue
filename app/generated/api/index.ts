/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppVercelAniblueFavorite from './types/app/vercel/aniblue/favorite'
import * as AppVercelAniblueStatus from './types/app/vercel/aniblue/status'

export * as AppVercelAniblueFavorite from './types/app/vercel/aniblue/favorite'
export * as AppVercelAniblueStatus from './types/app/vercel/aniblue/status'

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
  vercel: AppVercelNS

  constructor(client: XrpcClient) {
    this._client = client
    this.vercel = new AppVercelNS(client)
  }
}

export class AppVercelNS {
  _client: XrpcClient
  aniblue: AppVercelAniblueNS

  constructor(client: XrpcClient) {
    this._client = client
    this.aniblue = new AppVercelAniblueNS(client)
  }
}

export class AppVercelAniblueNS {
  _client: XrpcClient
  favorite: FavoriteRecord
  status: StatusRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.favorite = new FavoriteRecord(client)
    this.status = new StatusRecord(client)
  }
}

export class FavoriteRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppVercelAniblueFavorite.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.vercel.aniblue.favorite',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppVercelAniblueFavorite.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.vercel.aniblue.favorite',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppVercelAniblueFavorite.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.vercel.aniblue.favorite'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection: 'app.vercel.aniblue.favorite',
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
      { collection: 'app.vercel.aniblue.favorite', ...params },
      { headers },
    )
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
    records: { uri: string; value: AppVercelAniblueStatus.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.vercel.aniblue.status',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppVercelAniblueStatus.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.vercel.aniblue.status',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppVercelAniblueStatus.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.vercel.aniblue.status'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection: 'app.vercel.aniblue.status',
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
      { collection: 'app.vercel.aniblue.status', ...params },
      { headers },
    )
  }
}
