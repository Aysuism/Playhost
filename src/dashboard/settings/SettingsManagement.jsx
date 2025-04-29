import React, { useState, useEffect, useContext } from 'react';
import DataSetting from './DataSetting';
import AddSettingForm from './AddSettingForm';
import { useGetSettingsQuery } from '../tools/api/settings';
import { LangContext } from '../../context/LangContext';

const SettingsManagement = () => {
  const { lang } = useContext(LangContext);
  const { data: settings=[], refetch } = useGetSettingsQuery();

  if (!settings || settings.length === 0) return <div>No settings found</div>;

  return (
    <div className="settings-management">
      <div className='p-3'>
        <h1>{lang === 'AZ' ? 'Ümumi Parametrlər' : 'Settings Management'}</h1>
      </div>
      <DataSetting settings={settings} refetch={refetch} />
    </div>
  );
};

export default SettingsManagement;