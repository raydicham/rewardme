const IMAGE_CACHE_KEY = 'userimages'

export default {
  async setImage(key: string, dataUrl: string) {
    const cache = await caches.open(IMAGE_CACHE_KEY)
    const cacheKey = key.startsWith('/') ? key : `/${key}`
    const response = new Response(dataUrl)
    await cache.put(cacheKey, response)
  },
  async getImage(key: string) {
    const cache = await caches.open(IMAGE_CACHE_KEY)
    const cacheKey = key.startsWith('/') ? key : `/${key}`
    const match = await cache.match(cacheKey)
    return await match?.text()
  },
}
