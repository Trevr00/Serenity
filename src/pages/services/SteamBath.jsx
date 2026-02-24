import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function SteamBath() {
  return <ServiceDetailTemplate service={getServiceBySlug('steam-bath')} />
}
