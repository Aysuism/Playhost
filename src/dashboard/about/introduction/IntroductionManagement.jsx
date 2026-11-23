import DataIntroduction from './DataIntroduction';
import { useGetIntroductionQuery } from '../../tools/api/about-introduction';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const IntroductionManagement = () => {
  const { lang } = useContext(LangContext)
  const { data: introductions, refetch } = useGetIntroductionQuery();

  return (
    <div className="introduction-management">
      <div className="p-3">
        <h1>{lang === 'AZ' ? 'Təqdimat Məzmununun İdarəsi' : 'Introduction Content Management'}</h1>
      </div>

      <DataIntroduction introductions={introductions} refetch={refetch} />
    </div>
  );
};

export default IntroductionManagement;