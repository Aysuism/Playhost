import React from 'react'
import { useGetHomeFooterQuery } from '../../tools/api/home-footer'
import DataHomeFooter from './DataHomeFooter';
import AddHomeFooterForm from './AddHomeFooterForm';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const HomeFooterManagement = () => {
  const { lang } = useContext(LangContext)
  const { data: footer=[], refetch } = useGetHomeFooterQuery()
  return (
    <div className='footer-management'>
      <h1>  {lang === 'AZ' ? 'Footer İdarəsi' : 'Footer Management'}</h1>
      <div className="row">
        {/* Display footer in a table */}
        <DataHomeFooter footer={footer} refetch={refetch} />

        {/* Add footer Form */}
        {/* <div className="col-lg-4 col-md-3 col-sm-12">
          <AddHomeFooterForm refetch={refetch} />
        </div> */}
      </div>
    </div>
  )
}

export default HomeFooterManagement