import { toast } from '../components/Toaster'; // adjust the path

let lang = 'EN';
export const setNotifyLang = (value) => {
    lang = value;
};

const t = (az, en) => (lang === 'AZ' ? az : en);

const success = (az, en) => toast.success(t(az, en), { title: t('Uğurlu', 'Success') });
const error = (az, en, serverMessage) => toast.error(serverMessage || t(az, en), { title: t('Xəta', 'Error') });
const warning = (az, en) => toast.warning(t(az, en), { title: t('Xəbərdarlıq', 'Warning') });
const info = (az, en) => toast.info(t(az, en));

const added = () => success('Uğurla əlavə edildi.', 'Added successfully.');
const updated = () => success('Uğurla yeniləndi.', 'Updated successfully.');
const deleted = () => success('Uğurla silindi.', 'Deleted successfully.');

const addFailed = (serverMessage) => error('Əlavə edilmədi.', 'Failed to add.', serverMessage);
const updateFailed = (serverMessage) => error('Yenilənmədi.', 'Failed to update.', serverMessage);
const deleteFailed = (serverMessage) => error('Silinmədi.', 'Failed to delete.', serverMessage);

const confirm = (az, en, yesAz = 'Bəli', yesEn = 'Yes', titleAz = 'Əminsiniz?', titleEn = 'Are you sure?') =>
    toast.confirm(t(az, en), {
        title: t(titleAz, titleEn),
        confirmText: t(yesAz, yesEn),
        cancelText: t('Ləğv et', 'Cancel'),
    });

const confirmDelete = () =>
    confirm('Bu əməliyyat geri qaytarıla bilməz.', 'This action cannot be undone.', 'Sil', 'Delete', 'Silinsin?', 'Delete?');

const confirmLogin = (az, en) => confirm(az, en, 'Daxil ol', 'Login', 'Daxil olmalısınız', 'Login Required');

const deleteItem = async (deleteFn, onDone) => {
    const ok = await confirmDelete();
    if (!ok) return;

    try {
        await deleteFn();
        deleted();
        if (onDone) onDone();
    } catch (err) {
        deleteFailed(err.data?.message);
    }
};

export const notify = {
    success, error, warning, info,
    added, updated, deleted,
    addFailed, updateFailed, deleteFailed,
    confirm, confirmDelete, confirmLogin, deleteItem,
};