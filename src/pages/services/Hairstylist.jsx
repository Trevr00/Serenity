import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function Hairstylist() {
  return <ServiceDetailTemplate service={getServiceBySlug('hairstylist')} />
}
