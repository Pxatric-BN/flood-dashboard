import type {
  Flood30DaysParams,
  FloodFeatureCollection,
} from '@/feature/prediction/types/prediction.types'

const BASE_URL =
  'https://api-gateway.gistda.or.th/api/2.0/resources'

export async function getFlood30Days(
  params: Flood30DaysParams,
  signal?: AbortSignal,
): Promise<FloodFeatureCollection> {
  const apiKey = import.meta.env.VITE_GISTDA_API_KEY

  if (!apiKey) {
    throw new Error('Missing GISTDA API key')
  }

  const url = new URL(`${BASE_URL}/features/flood/30days`)

  url.searchParams.set('limit', String(params.limit ?? 100))
  url.searchParams.set('offset', String(params.offset ?? 0))

  if (params.bbox) {
    url.searchParams.set('bbox', params.bbox.join(','))
  }

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'API-Key': apiKey,
    },
    signal,
  })

  if (!response.ok) {
    throw new Error(`GISTDA API error: ${response.status}`)
  }

  return (await response.json()) as FloodFeatureCollection
}