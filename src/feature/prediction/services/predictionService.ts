
import type {
  FloodQueryParams,
  FloodFeatureCollection,
  FloodPeriod,
} from '@/feature/prediction/types/prediction.types'

const BASE_URL =
  'https://api-gateway.gistda.or.th/api/2.0/resources'

export async function getFloodData(
  period: FloodPeriod,
  params: FloodQueryParams,
  signal?: AbortSignal,
): Promise<FloodFeatureCollection> {
  const apiKey = import.meta.env.VITE_GISTDA_API_KEY

  if (!apiKey) {
    throw new Error('Missing GISTDA API key')
  }

  const url = new URL(`${BASE_URL}/features/flood/${period}`)

  url.searchParams.set('limit', String(params.limit ?? 100))
  url.searchParams.set('offset', String(params.offset ?? 0))

  if (params.pv_idn) {
    url.searchParams.set('pv_idn', params.pv_idn)
  }

  if (params.ap_idn) {
    url.searchParams.set('ap_idn', params.ap_idn)
  }

  if (params.tb_idn) {
    url.searchParams.set('tb_idn', params.tb_idn)
  }

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
