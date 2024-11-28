/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'

export interface Record {
  favorites: Favorite[]
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.vercel.aniblue.favorite#main' ||
      v.$type === 'app.vercel.aniblue.favorite')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.aniblue.favorite#main', v)
}

export interface Favorite {
  /** Annict API ID for the anime */
  id: number
  [k: string]: unknown
}

export function isFavorite(v: unknown): v is Favorite {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'app.vercel.aniblue.favorite#favorite'
  )
}

export function validateFavorite(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.aniblue.favorite#favorite', v)
}
