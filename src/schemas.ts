import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const Task = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
  },
)

export const Reward = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
    image: z.string().optional(), // as base64
    tasks: z.record(z.string(), Task).default({}),
  },
)

export const Profile = z.object(
  {
    id: z.string().default(() => uuidv4()),
    name: z.string(),
    nickname: z.string().default(''),
    dateofbirth: z.date(),
    hobby: z.string().default(''),
    color: z.string(),
    image: z.string().optional(), // as base64
    rewards: z.record(z.string(), Reward).default({}),
  },
)

export const ProfileSummary = Profile.pick({
  id: true,
  name: true,
  image: true,
})

export const ProfileSummaries = z.array(ProfileSummary)
