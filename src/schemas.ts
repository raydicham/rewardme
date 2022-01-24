import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const Profile = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
    nickname: z.string().default(''),
    dateofbirth: z.date(),
    hobby: z.string().default(''),
    color: z.string(),
    image: z.string().optional(), // as base64
  },
)

export const Reward = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
    image: z.string().optional(), // as base64
    profile: z.string().uuid(),
  },
)

export const Task = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
    reward: z.string().uuid(),
  },
)
