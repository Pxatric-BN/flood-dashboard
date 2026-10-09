
import type { FloodProperties } from '@/feature/prediction/types/prediction.types'

export function createFloodPopup(
  properties: FloodProperties | null,
): HTMLElement {
  const container = document.createElement('div')
  const title = document.createElement('strong')

  title.textContent = 'พื้นที่น้ำท่วมจาก GISTDA'
  container.append(title)

  const location = [
    properties?.tb_tn,
    properties?.ap_tn,
    properties?.pv_tn,
  ]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ')

  const area = properties?.f_area ?? properties?._area

  const locationText = document.createElement('p')
  locationText.textContent = `พื้นที่: ${location || 'ไม่ระบุ'}`
  container.append(locationText)

  const areaText = document.createElement('p')
  areaText.textContent =
    typeof area === 'number'
      ? `พื้นที่: ${area.toLocaleString('th-TH')} ตร.ม.`
      : 'พื้นที่: ไม่มีข้อมูล'

  container.append(areaText)

  return container
}
