import React, { useContext } from 'react'
import { useGetServiceQuery } from '../../tools/api/home-service'
import DataService from './DataService';
import AddServiceForm from './AddServiceForm';
import { LangContext } from '../../../context/LangContext';

const ServiceManagement = () => {
    const { lang } = useContext(LangContext)

    const { data: services=[], refetch } = useGetServiceQuery()

    return (
        <div className='service-management'>
            <div className='p-3'>
                <h1> {lang === 'AZ' ? 'Xidmət İdarəsi' : 'Hero Service Management'}</h1>
                <button type="button" className="btn add-button" data-bs-toggle="modal" data-bs-target="#addServiceModal" >
                    {lang === 'AZ' ? 'Yeni Xidmət Əlavə Et' : 'Add New Service'}
                </button>
            </div>

            <DataService services={services} refetch={refetch} />

            <div className="modal fade" id="addServiceModal" tabIndex="-1" aria-labelledby="addServiceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addServiceModalLabel">{lang === 'AZ' ? 'Yeni Xidmət Əlavə Et' : 'Add New Service'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <AddServiceForm refetch={refetch} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceManagement