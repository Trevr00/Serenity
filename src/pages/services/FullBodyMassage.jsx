import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function FullBodyMassage() {
  return <ServiceDetailTemplate service={getServiceBySlug('full-body-massage')} />
}
