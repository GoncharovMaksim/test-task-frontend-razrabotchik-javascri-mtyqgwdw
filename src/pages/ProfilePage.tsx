import React, { useEffect } from 'react';
import { Page } from '../components/common/Page';
import { Body } from '../components/common/Body';
import { EditView } from '../components/profile/EditView';
import { useAppDispatch, useAppSelector } from '../store';
import {
  loadProfile,
  resetProfileForm,
  saveProfileData,
  updateFieldValue,
} from '../features/profile/profileSlice';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    fields,
    values,
    hiddenFieldIds,
    disabledFieldIds,
    isSubmitting,
    saveSuccess,
    error,
    isLoading,
  } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  const handleFieldChange = (fieldId: string, value: string | number | string[]) => {
    dispatch(updateFieldValue({ fieldId, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveProfileData(values));
  };

  const handleReset = () => {
    dispatch(resetProfileForm());
  };

  return (
    <Page title="Редактирование профиля">
      <Body
        title="Профиль сотрудника (20 полей)"
        subtitle="Форма изменения данных с валидацией, динамическими зависимостями и асинхронным сохранением"
      >
        <div className="space-y-8">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="p-16 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <EditView
                fields={fields}
                values={values}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                disabledFieldIds={disabledFieldIds}
                hiddenFieldIds={hiddenFieldIds}
                isSubmitting={isSubmitting}
                saveSuccess={saveSuccess}
              />
            </div>
          )}
        </div>
      </Body>
    </Page>
  );
};
