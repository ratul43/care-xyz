
import services from '@/data/services.json';
export const  getSingleService = async (serviceId) => {
    

    const service = services.find((s) => s.id === serviceId);

    // console.log(service);

    return service


}