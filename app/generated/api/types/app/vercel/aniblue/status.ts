/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'

export interface Record {
  status: Status[]
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.vercel.aniblue.status#main' ||
      v.$type === 'app.vercel.aniblue.status')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.aniblue.status#main', v)
}

export interface Status {
  /** Annict API ID for the anime */
  id: number
  /** Title of the anime */
  title: string
  /** URL of the anime thumbnail image */
  thumbnail?: string
  /** Current watching status of the anime */
  status: 'watching' | 'watched' | 'pending'
  /** Current number of episode */
  episode_count: number
  [k: string]: unknown
}

export function isStatus(v: unknown): v is Status {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'app.vercel.aniblue.status#status'
  )
}

export function validateStatus(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.aniblue.status#status', v)
}
