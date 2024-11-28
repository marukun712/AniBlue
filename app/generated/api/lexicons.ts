/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  AppVercelAniblueFavorite: {
    lexicon: 1,
    id: 'app.vercel.aniblue.favorite',
    defs: {
      main: {
        type: 'record',
        description: 'A record that stores the favorite status of anime.',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['favorites'],
          properties: {
            favorites: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.vercel.aniblue.favorite#favorite',
              },
            },
          },
        },
      },
      favorite: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'integer',
            description: 'Annict API ID for the anime',
          },
        },
      },
    },
  },
  AppVercelAniblueStatus: {
    lexicon: 1,
    id: 'app.vercel.aniblue.status',
    defs: {
      main: {
        type: 'record',
        description: 'A record that stores the status of the anime.',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.vercel.aniblue.status#status',
              },
            },
          },
        },
      },
      status: {
        type: 'object',
        required: ['id', 'title', 'status', 'episode_text'],
        properties: {
          id: {
            type: 'integer',
            description: 'Annict API ID for the anime',
          },
          title: {
            type: 'string',
            description: 'Title of the anime',
          },
          thumbnail: {
            type: 'string',
            description: 'URL of the anime thumbnail image',
          },
          status: {
            type: 'string',
            description: 'Current watching status of the anime',
            enum: ['watching', 'watched', 'pending'],
          },
          episode_text: {
            type: 'string',
            description: 'Current number text of episode',
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict)
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = {
  AppVercelAniblueFavorite: 'app.vercel.aniblue.favorite',
  AppVercelAniblueStatus: 'app.vercel.aniblue.status',
}
