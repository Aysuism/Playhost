import { useGetHomeFooterQuery } from '../../tools/api/home-footer'
import { LangContext } from '../../../context/LangContext';
import DataHomeFooter from './DataHomeFooter';
import { useContext } from 'react';

const HomeFooterManagement = () => {
  const { lang } = useContext(LangContext)
  const { data: footer=[], refetch } = useGetHomeFooterQuery()
  return (
    <div className='footer-management'>
      <h1>  {lang === 'AZ' ? 'Footer İdarəsi' : 'Footer Management'}</h1>
      <div className="row">
        <DataHomeFooter footer={footer} refetch={refetch} />
      </div>
    </div>
  )
}

export default HomeFooterManagement