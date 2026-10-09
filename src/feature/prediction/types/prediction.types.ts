
import type { Feature, FeatureCollection, Geometry } from 'geojson'


export interface FloodQueryParams {
  limit?: number
  offset?: number
  pv_idn?: string
  ap_idn?: string
  tb_idn?: string
  bbox?: [number, number, number, number]
}

export interface FloodProperties {
  _id?: string
  f_area?: number
  _area?: number
  building?: number
  hospital?: number
  population?: number
  school?: number
  length_road?: number
  pv_idn?: number
  pv_tn?: string
  ap_idn?: number
  ap_tn?: string
  tb_idn?: number
  tb_tn?: string
  _createdAt?: string
  file_name?: string
  [key: string]: unknown
}

export type FloodFeature = Feature<Geometry, FloodProperties | null>

export type FloodFeatureCollection = FeatureCollection<
  Geometry,
  FloodProperties | null
> & {
  numberMatched?: number
  numberReturned?: number
  timeStamp?: string
}

export type FloodPeriod = '1day' | '3days' | '7days' | '30days'