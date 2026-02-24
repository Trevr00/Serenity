import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function MiniGym() {
  return <ServiceDetailTemplate service={getServiceBySlug('mini-gym')} />
}
