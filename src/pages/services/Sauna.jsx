import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function Sauna() {
  return <ServiceDetailTemplate service={getServiceBySlug('sauna')} />
}
