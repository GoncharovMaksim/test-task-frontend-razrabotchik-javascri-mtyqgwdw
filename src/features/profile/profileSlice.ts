import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MockApiService } from '../../api/mockApi';
import { INITIAL_PROFILE_VALUES, PROFILE_FIELDS_20 } from '../../api/mockData';
import { ProfileFieldDefinition, ProfileFormData } from '../../types';

interface ProfileState {
  fields: ProfileFieldDefinition[];
  values: ProfileFormData;
  initialValues: ProfileFormData;
  hiddenFieldIds: Record<string, boolean>;
  disabledFieldIds: Record<string, boolean>;
  isSubmitting: boolean;
  saveSuccess: boolean;
  error: string | null;
  isLoading: boolean;
}

const computeDependencies = (values: ProfileFormData) => {
  const hiddenFieldIds: Record<string, boolean> = {};
  const disabledFieldIds: Record<string, boolean> = {};
  const updatedValues: Partial<ProfileFormData> = {};

  // FIELD A: employmentType
  // When value is 'intern' (Стажировка / Студент):
  // FIELD B: officeCity is hidden
  // FIELD C: mentorshipRequired is disabled and preset to 'mandatory'
  if (values.employmentType === 'intern') {
    hiddenFieldIds.officeCity = true;
    disabledFieldIds.mentorshipRequired = true;
    if (values.mentorshipRequired !== 'mandatory') {
      updatedValues.mentorshipRequired = 'mandatory';
    }
  } else {
    hiddenFieldIds.officeCity = false;
    disabledFieldIds.mentorshipRequired = false;
  }

  return { hiddenFieldIds, disabledFieldIds, updatedValues };
};

const initialComputed = computeDependencies(INITIAL_PROFILE_VALUES);

const initialState: ProfileState = {
  fields: PROFILE_FIELDS_20,
  values: {
    ...INITIAL_PROFILE_VALUES,
    ...initialComputed.updatedValues,
  },
  initialValues: { ...INITIAL_PROFILE_VALUES },
  hiddenFieldIds: initialComputed.hiddenFieldIds,
  disabledFieldIds: initialComputed.disabledFieldIds,
  isSubmitting: false,
  saveSuccess: false,
  error: null,
  isLoading: false,
};

export const loadProfile = createAsyncThunk('profile/loadProfile', async () => {
  const data = await MockApiService.getProfile();
  return data;
});

export const saveProfileData = createAsyncThunk(
  'profile/saveProfile',
  async (data: ProfileFormData) => {
    const res = await MockApiService.saveProfile(data);
    return res;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateFieldValue: (
      state,
      action: PayloadAction<{ fieldId: string; value: string | number | string[] }>
    ) => {
      const { fieldId, value } = action.payload;
      state.values[fieldId] = value;
      state.saveSuccess = false;

      // Recompute dependencies
      const { hiddenFieldIds, disabledFieldIds, updatedValues } = computeDependencies(state.values);
      state.hiddenFieldIds = hiddenFieldIds;
      state.disabledFieldIds = disabledFieldIds;
      Object.assign(state.values, updatedValues);
    },
    resetProfileForm: (state) => {
      state.values = { ...state.initialValues };
      const { hiddenFieldIds, disabledFieldIds, updatedValues } = computeDependencies(state.values);
      state.hiddenFieldIds = hiddenFieldIds;
      state.disabledFieldIds = disabledFieldIds;
      Object.assign(state.values, updatedValues);
      state.saveSuccess = false;
      state.error = null;
    },
    dismissSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load
      .addCase(loadProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProfile.fulfilled, (state, action: PayloadAction<ProfileFormData>) => {
        state.isLoading = false;
        state.values = action.payload;
        state.initialValues = { ...action.payload };
        const { hiddenFieldIds, disabledFieldIds, updatedValues } = computeDependencies(state.values);
        state.hiddenFieldIds = hiddenFieldIds;
        state.disabledFieldIds = disabledFieldIds;
        Object.assign(state.values, updatedValues);
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки профиля';
      })
      // Save
      .addCase(saveProfileData.pending, (state) => {
        state.isSubmitting = true;
        state.saveSuccess = false;
        state.error = null;
      })
      .addCase(saveProfileData.fulfilled, (state, action: PayloadAction<ProfileFormData>) => {
        state.isSubmitting = false;
        state.saveSuccess = true;
        state.values = action.payload;
        state.initialValues = { ...action.payload };
      })
      .addCase(saveProfileData.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || 'Ошибка сохранения данных профиля';
      });
  },
});

export const { updateFieldValue, resetProfileForm, dismissSaveSuccess } = profileSlice.actions;
export default profileSlice.reducer;
