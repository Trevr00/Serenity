import ServiceDetailTemplate from '../../components/ServiceDetailTemplate'
import { getServiceBySlug } from '../../data/services'

export default function ShavingParlour() {
  return <ServiceDetailTemplate service={getServiceBySlug('shaving-parlour')} />
}
