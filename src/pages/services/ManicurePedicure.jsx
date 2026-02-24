import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function ManicurePedicure() {
  return <ServiceDetailTemplate service={getServiceBySlug('manicure-pedicure')} />
}
